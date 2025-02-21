import {ORG_CONFIG, ORGANIZATION, ORGANIZATIONS, PERIOD, PERIODS} from "./config";
import _ from "lodash";

export type CalculationData = {
    [key in ORGANIZATION]: { [key in PERIOD]: number | null }
};

export type AverageData = {
    [key in PERIOD]: number | null
};

export function buildData(input: number): CalculationData {
    return ORGANIZATIONS.reduce((acc, org) => {
        acc[org] = PERIODS.reduce((innerAcc, period) => {
            let configValue = ORG_CONFIG[org][period];
            innerAcc[period] = configValue === null ? null : input * configValue;
            return innerAcc;
        }, {} as { [key in PERIOD]: number | null });
        return acc;
    }, {} as CalculationData);
}

export function calculateAveragePayments(tableData: CalculationData) {
    let averageData = {} as { [key in PERIOD]: number | null };
    for (let period of PERIODS) {
        let mean = _.mean(Object.values(tableData).map(orgValues => orgValues[period]).filter(value => value != null));
        averageData[period] = mean;
    }
    return averageData;
}


export function calculateTargetPrice(sourcePrice: number): number {
    if (sourcePrice === 0) {
        return 0;
    } else if (sourcePrice > 3000) {
        return sourcePrice * 1.4;
    } else if (sourcePrice > 2000) {
        return sourcePrice * 1.5;
    } else if (sourcePrice > 1500) {
        return sourcePrice * 1.6;
    } else if (sourcePrice > 1000) {
        return sourcePrice * 1.7;
    } else if (sourcePrice > 500) {
        return sourcePrice * 1.8 + 100;
    } else {
        return sourcePrice * 2.25;
    }
}
