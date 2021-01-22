import React, { Component } from "react";
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';

import styles from "./Chart.module.css"


class Chart1 extends Component {

    render() {

        return (
            <div className={styles.Chart}>
                <h2> Mon premier graphique</h2>
                <div className={styles.Draw}>
                    <XYPlot
                        width={300}
                        height={300}>
                        <HorizontalGridLines />
                        <LineSeries
                            data={[
                                { x: 1, y: 10 },
                                { x: 2, y: 5 },
                                { x: 3, y: 15 }
                            ]} />
                        <XAxis />
                        <YAxis />
                    </XYPlot>
                </div>
            </div>
        )
    }
}

export default Chart1;