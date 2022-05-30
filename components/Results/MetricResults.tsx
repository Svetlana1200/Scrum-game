import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import styles, {Context} from '../../helpers/consts'
import { Metric } from '../../helpers/Roles';
import { MetricTask } from '../../helpers/Tasks';

type IProps = {
  task: MetricTask
}

export class MetricResult extends React.Component<IProps> {
    getResult() {
        switch(this.props.route.params.task.name) {
            case Metric.ARPU:
                return `Средний доход = `
            case Metric.RR:
                return `Коэффициент удержания = `
        }
    }
    render() {
        return (
            <Text style={styles.standartText}>{this.getResult()}</Text>
        )
    }
};
MetricResult.contextType = Context;

export default MetricResult;
