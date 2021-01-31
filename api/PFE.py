#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Jan  5 12:49:40 2021

@author: elias
"""

def analyse():

    ####
    import pandas as pd
    import datetime
    import numpy as np
#    import matplotlib.pyplot as plt
    
    import functions as fct
    
    DATE_COLONNE = "Date (Europe/Paris)"
    TEMP_EXT = "T°C ext"
    
    ####
    f = open('api/association_circuit_salle.txt', 'r')
    file = f.read()
    lines = file.splitlines()
    for index in range(len(lines)):
        lines[index] = lines[index].split(' @#@ ')
    
    map_association = {line[0]:line[1] for line in lines}
    map_unite = {line[0]:line[2] for line in lines}
    
    #### Formatage
    # Read CSV file into DataFrame df
    df = pd.read_csv('/Users/markoarsovic/Desktop/LCSC1.csv', delimiter=";")
    
    # Show dataframe
    name_capteur = df.columns.values.tolist()
    del name_capteur[0], name_capteur[0]
    
    df[DATE_COLONNE] = pd.to_datetime(df[DATE_COLONNE], format='%d/%m/%Y %H:%M')
    
    for name in name_capteur:
        df[name] = df[name].str.replace(',' , '.').astype(float)
    
    del name, name_capteur
    
    ####
    
    #plt.plot( df[DATE_COLONNE][34:106], df['Salle A.1.1'][34:106])
    df = df[:3000]
    df = df.reset_index(drop=True)
    
    ####
    
    frequence, standard_deviation = fct.frequency_std_database(df[DATE_COLONNE])
    standard_deviation = datetime.timedelta(days=8)
    
    #####  
     
    #df.plot.line(x = DATE_COLONNE, y = 'Circuit maternelle')
    #debut = 140
    #fin = 262
    #plt.plot(df[DATE_COLONNE][debut:fin], df[['Circuit maternelle']][debut:fin])
    #plt.show()
    #plt.plot(df[DATE_COLONNE][debut:fin], df[['Salle Maternelle 2 RDC', TEMP_EXT]][debut:fin])
    #print(df[DATE_COLONNE][debut], df[DATE_COLONNE][fin])
    #
    #temp = df[[DATE_COLONNE, 'Circuit maternelle', 'Salle Maternelle 2 RDC', 'Salle Maternelle 3 1° étage', TEMP_EXT]][debut:fin]
    
    ####Personnalisation des datas
    
    horaire_ouverture = datetime.datetime.strptime("07:00:00", '%H:%M:%S')
    horaire_fermeture = datetime.datetime.strptime("18:00:00", '%H:%M:%S')
    
    vacance_debut = datetime.datetime.strptime("21/12/2019", '%d/%m/%Y')
    vacance_fin = datetime.datetime.strptime("05/01/2020", '%d/%m/%Y')
    
    #For the days open
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    days_open = [True, True, True, True, True, False, False]
    days_closed = ~np.array(days_open)
    
    days_open = np.array(days)[np.array(days_open)].tolist()
    days_closed = np.array(days)[np.array(days_closed)].tolist()
    
    data_open_hours = fct.is_open_day(df, days_closed, [], [], [], DATE_COLONNE)
    data_open_hours = fct.is_open_hours(data_open_hours, horaire_ouverture, horaire_fermeture, DATE_COLONNE)
    
    #separer les données avant ouverture du batiment et fermeture totale du batiment (vacances)
    data_closed_hours, data_closed_days = fct.closed(df, data_open_hours[DATE_COLONNE].tolist(), DATE_COLONNE)
    data_per_week_per_hours = fct.segmentation_semaine(data_closed_hours, horaire_ouverture, horaire_fermeture, DATE_COLONNE)
    
    del days, days_open, days_closed
    
    ####
    temp_room = ['Réfectoire primaire',
                 'Salle B.1.3',
                 'Salle B.2.2',
                 'Salle A.2.1',
                 'Salle A.1.1',
                 'Salle des maitres',
                 'Salle Maternelle 2 RDC',
                 'Salle Maternelle 3 1° étage',
                 'Salle motricité 1° étage']
    
    temp_room = list(map_association.keys())
    
    """
    Il faudra detecter le type de chaque colonne
    """
    
    #### Moving average 
    
    #use n previous periods to calculate moving average 
#    n=7*24
#    
#    moving_average_room = moving_average(data_open_hours[temp_room], n)
#    moving_average_exterieur = moving_average(data_open_hours[TEMP_EXT], n)
#    moving_average_time = data_open_hours[DATE_COLONNE][(n-1):]
#    
#    #On analyse les movings average
#    moving_average_time = moving_average_time.values
#    #Reshape pour avoir un tableau en 2D (nb_data, 1)
#    moving_average_time = np.reshape(moving_average_time, (moving_average_time.shape[0], 1))
#    moving_average_analyse = np.concatenate((moving_average_time, moving_average_room, moving_average_exterieur), axis=1)
#    
#    moving_average_analyse = pd.DataFrame(data = moving_average_analyse,  
#                                          index = [i for i in range(len(moving_average_analyse))],  
#                                          columns = [DATE_COLONNE] + temp_room + [TEMP_EXT])
#    
#    del moving_average_time, moving_average_room, moving_average_exterieur
    
    #### Analyse des donées avec consels
    """Ouverture"""
    
    #Provisoire
    temp_confort = {name:20 for name in df.columns}
    gap_to_confort = {name:0.1 for name in df.columns}
    
    analyse_data_by_point_open = fct.analyse_temperature_point(df, data_open_hours[[DATE_COLONNE] + temp_room+ [TEMP_EXT]], temp_confort, gap_to_confort, fct.conseil_open, TEMP_EXT, DATE_COLONNE, map_association)
    analyse_data_by_point_holidays = fct.analyse_temperature_point(df, data_closed_hours[[DATE_COLONNE] + temp_room+ [TEMP_EXT]], temp_confort, gap_to_confort, fct.conseil_closed, TEMP_EXT, DATE_COLONNE, map_association)
    
    analyse_data_open = fct.formatage_conseil(analyse_data_by_point_open, frequence, standard_deviation)
    analyse_data_holidyas = fct.formatage_conseil(analyse_data_by_point_holidays, frequence, standard_deviation)
    
    ####
    #plt.plot( df[DATE_COLONNE], df['Salle A.1.1'])
    
    ####
    """Closed"""                 
    
    def frequence_conseil(analyse_conseil: dict):
        freq_conseil = {name: {} for name in analyse_conseil.keys()}
        
        for name in analyse_conseil.keys():
            if len(analyse_conseil[name]) > 0:
                freq_conseil[name] = {analyse_conseil[name][0][2] : [[analyse_conseil[name][0][0], analyse_conseil[name][0][1]]]}
                
                for index in range(1, len(analyse_conseil[name])):
                    
                    name_conseil = analyse_conseil[name][index][2]
                    
                    if name_conseil in freq_conseil[name].keys():
                        freq_conseil[name][name_conseil].append([analyse_conseil[name][index][0], analyse_conseil[name][index][1]])
                    else:
                        freq_conseil[name][name_conseil] = [[analyse_conseil[name][index][0], analyse_conseil[name][index][1]]]
            
        #b = list()
        #convert in dataframe
        for name in freq_conseil.keys():
            #print("====", name,"====")
            for conseil in freq_conseil[name].keys():
                freq_conseil[name][conseil] = [pd.DataFrame( data = freq_conseil[name][conseil],  
                                                            index = [i for i in range(len(freq_conseil[name][conseil]))],  
                                                            columns = ["Debut", "Fin"])] 
                
#                print(conseil, "-->")
#                print(freq_conseil[name][conseil][0]["Debut"].diff().mean(), "....", freq_conseil[name][conseil][0]["Debut"].diff().std())
#                print('Fin :', freq_conseil[name][conseil][0]["Fin"].diff().mean(), "....", freq_conseil[name][conseil][0]["Fin"].diff().std())
                
                #print((freq_conseil[name][conseil][0]["Fin"] - freq_conseil[name][conseil][0]["Debut"]).mean(),"-----" ,(freq_conseil[name][conseil][0]["Fin"] - freq_conseil[name][conseil][0]["Debut"]).std())
#                print()
                
                if not freq_conseil[name][conseil][0]["Debut"].diff().std() > datetime.timedelta(days=10):
                    freq_conseil[name][conseil].append(freq_conseil[name][conseil][0]["Debut"].diff().mean().round('H'))
                    
                
    #            if freq_conseil[name][conseil][0]["Debut"].diff().mean() < datetime.timedelta(days=2):
    #                freq_conseil[name][conseil].append("Daily")
    #            
    #            elif freq_conseil[name][conseil][0]["Debut"].diff().mean() < datetime.timedelta(days=8):
    #                freq_conseil[name][conseil].append("Weekly")
    #                
    #            elif freq_conseil[name][conseil][0]["Debut"].diff().mean() < datetime.timedelta(days=32):
    #                freq_conseil[name][conseil].append("Monthly")
    #            else:
    #                freq_conseil[name][conseil].append("Ponctuel")
            #print()
            
        #b.append(freq_conseil["Salle A.1.1"]["Le chauffage est trop fort"][0]["Debut"].diff())
    #    print(b)
        return freq_conseil
    
        """il faut regarder l'ecart l'ecart entre nos dates 1 et 2 
        Si court 
        Si long  
        
        
        """
    analyse_conseil_data_open = frequence_conseil(analyse_data_open) 
    analyse_conseil_data_holidays = frequence_conseil(analyse_data_holidyas) 
    
    ####
    
    name = "Salle A.2.1"
    conseil = "Allumer la clim" 
    #display(data_open_hours, analyse_data_open, analyse_data_by_point_open, name, temp_confort[name], gap_to_confort[name], DATE_COLONNE)
    #display(data_closed_days, analyse_data_holidyas, analyse_data_by_point_holidays, name, temp_confort[name], gap_to_confort[name], DATE_COLONNE)
    
    ####
    df_to_send = pd.DataFrame(columns = ["Start", "End"] + df.columns[2:].to_list())
    
    df_to_send = fct.format_to_send_csv(df_to_send, df, analyse_conseil_data_open, analyse_data_by_point_open, DATE_COLONNE)
    df_to_send = fct.format_to_send_csv(df_to_send, df, analyse_conseil_data_holidays, analyse_data_by_point_holidays, DATE_COLONNE)
    
    #df_to_send.to_csv('Analyse.csv', sep=';', index=False) 
    
    #df_to_send.loc[((datetime.datetime(2019,12,4) < df_to_send[DATE_COLONNE]) & (datetime.datetime(2019,12,7) > df_to_send[DATE_COLONNE])), 'Salle A.1.1'] = 3
    
    ####
    return df_to_send.to_json(orient='index')
