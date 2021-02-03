#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Jan  5 12:49:40 2021

@author: elias
"""

def analyse(originalCSV: list, schemaJSON: list, DaysOPEN: list, HoursOPEN: list):

    assert len(originalCSV) > 1, "originalCSV attend une ligne avec les headers(titre des colonnes) et une ligne de données au minimum"
    assert len(schemaJSON) > 0, "schemaJSON ne doit pas être vide"
    assert len(DaysOPEN) == 7, "Taille DaysOPEN doit être égale à 7" 
    assert len(HoursOPEN) == 2, "Taille HoursOPEN doit être égale à 2 [Horaire ouverture, Horaire Fermeture]"   
    
    #### Bibliotheque
    import pandas as pd
    import datetime
    import numpy as np
    import json
    
    import functions as fct
    
    DATE_COLONNE = "Date (Europe/Paris)"
    TEMP_EXT = "T°C ext"  
    CHGT_HORAIRE = "Heure d'été / Heure d'hiver"
    
    #### Formatage
    df = list()
    
    for line in originalCSV:
        df.append(line.split(";"))
        
    del line
    
    df = pd.DataFrame( data = df[1:],  
                      index = [index for index in range(len(df)-1)],  
                      columns = df[0])
    
    ####Recuperation de certaine donnees du batiement
    association = json.loads(schemaJSON)
    
    map_association =   {elem['Room']:elem['Circuit'] for elem in association}
    map_unite       =   {elem['Room']:elem['Physic'] for elem in association}
    map_confort    =   {elem['Room']:float(elem['IdealPhysic']) for elem in association}
    # map_confort    =   {elem['Room']:20 for elem in association}
    gap_to_confort  =   {elem['Room']:0.1 for elem in association}
       
                 
    #### On cast nos données afin de pouvoir les utiliser
    name_capteur = df.columns.values.tolist()
    del name_capteur[0], name_capteur[0]
    
    df[DATE_COLONNE] = pd.to_datetime(df[DATE_COLONNE], format = '%d/%m/%Y %H:%M:%S')
    
    for name in name_capteur:
        df[name] = df[name].str.replace(',' , '.').astype(float)
    
    del name, name_capteur
    
    
    ####On recupere la liste des salles
    ListeSalle = list()

    for elem in association:
        add = True
        for elem_comp in association:
            if elem['Room'] == elem_comp['Circuit']:
                add = False
                break
        if add:
            if not elem['Room'] in [DATE_COLONNE, CHGT_HORAIRE, TEMP_EXT]:
                ListeSalle.append(elem['Room'])   
        
    #### On fixe notre ecart type afin de liser nos anomalies plus tard
    frequence, standard_deviation = fct.frequency_std_database(df[DATE_COLONNE])
    standard_deviation = datetime.timedelta(days=8)
    
    ####Personnalisation des datas    
    horaire_ouverture = datetime.datetime.strptime(HoursOPEN[0], '%H:%M:%S')
    horaire_fermeture = datetime.datetime.strptime(HoursOPEN[1], '%H:%M:%S')
    
    #Filtre nos données en fonction des parametres du batiement
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    
    #On inverse notre tableau de boolean
    days_closed = ~np.array(DaysOPEN)
    
    #On recupere 
    days_open = np.array(days)[np.array(DaysOPEN)].tolist()
    days_closed = np.array(days)[np.array(days_closed)].tolist()
    
    #On filtre nos données en fonction de si le batiment est ouvert
    data_open_hours = fct.is_open_day(df, days_closed, [], [], [], DATE_COLONNE)
    data_open_hours = fct.is_open_hours(data_open_hours, horaire_ouverture, horaire_fermeture, DATE_COLONNE)
    
    #On separe les données avant ouverture du batiment et fermeture totale du batiment (vacances)
    data_pre_open_post_closed, data_closed_days = fct.closed(df, data_open_hours[DATE_COLONNE].tolist(), DATE_COLONNE)
    #data_pre_open_post_closed = fct.segmentation_semaine(data_pre_open_post_closed, horaire_ouverture, horaire_fermeture, DATE_COLONNE)
    
    #data_pre_open_post_closed is remove because it not needed for now
    del days, days_open, days_closed, data_pre_open_post_closed

    ####Analyse chaque donée en detectant le probleme
    analyse_data_by_point_open = fct.analyse_temperature_point(df, data_open_hours[[DATE_COLONNE] + ListeSalle + [TEMP_EXT]], ListeSalle, map_confort, gap_to_confort, fct.anomalie_open, TEMP_EXT, DATE_COLONNE, map_association)
    analyse_data_by_point_holidays = fct.analyse_temperature_point(df, data_closed_days[[DATE_COLONNE] + ListeSalle+ [TEMP_EXT]], ListeSalle, map_confort, gap_to_confort, fct.anomalie_closed, TEMP_EXT, DATE_COLONNE, map_association)
    
    ####Restructuration des problemes releves afin de donner une période
    analyse_data_open = fct.formatage_probleme(analyse_data_by_point_open, frequence, standard_deviation)
    analyse_data_holidyas = fct.formatage_probleme(analyse_data_by_point_holidays, frequence, standard_deviation)
    
    ####
    analyse_anomalie_data_open = fct.remodelage_analyse(df, analyse_data_open, frequence, DATE_COLONNE) 
    analyse_anomalie_data_holidays = fct.remodelage_analyse(df, analyse_data_holidyas, frequence, DATE_COLONNE) 
    
    full_analyse = fct.format_to_send_json(list(), analyse_anomalie_data_open, analyse_anomalie_data_holidays)
    
    return json.dumps(full_analyse)

