export enum PERIOD {
    M12 = '12 мес',
    M24 = '24 мес',
    M36 = '36 мес',
    M48 = '48 мес',
    M60 = '60 мес',
}

export const PERIODS = Object.values(PERIOD);


export enum ORGANIZATION {
    BankReshenie = 'Банк "Решение"',
    BankParitet = 'Банк "Паритет"',
    BankRRB = 'Банк "РРБ"',
    BankSBER = 'Банк "СБЕР"',
    LizingAvtoprom = 'Лизинг "Автопром"',
    LizingRiteil = 'Лизинг "Ритейл"',
    LizingYuwil = 'Лизинг "Ювилс"',
    LizingLait = 'Лизинг "Лайт"',
    LizingSmart = 'Лизинг "Смарт"',
    LizingAkcept = 'Лизинг "Акцепт"',
}

export const ORGANIZATIONS = Object.values(ORGANIZATION);

export const ORG_CONFIG: { [org in ORGANIZATION]: { [period in PERIOD]: number | null } } = {
    [ORGANIZATION.BankReshenie]: {
        [PERIOD.M12]: 1.09404 / 12,
        [PERIOD.M24]: 1.17647 / 24,
        [PERIOD.M36]: 1.25875 / 36,
        [PERIOD.M48]: 1.341 / 48,
        [PERIOD.M60]: 1.4231 / 60,
    },
    [ORGANIZATION.BankParitet]: {
        [PERIOD.M12]: 0.090933,
        [PERIOD.M24]: 0.049166,
        [PERIOD.M36]: null,
        [PERIOD.M48]: null,
        [PERIOD.M60]: null,
    },
    [ORGANIZATION.BankRRB]: {
        [PERIOD.M12]: null,
        [PERIOD.M24]: null,
        [PERIOD.M36]: 0.036778,
        [PERIOD.M48]: null,
        [PERIOD.M60]: null,
    },
    [ORGANIZATION.BankSBER]: {
        [PERIOD.M12]: 1.1141 / 12,
        [PERIOD.M24]: 1.2173 / 24,
        [PERIOD.M36]: 1.3411 / 36,
        [PERIOD.M48]: 1.4531 / 48,
        [PERIOD.M60]: 1.5911 / 60,
    },
    [ORGANIZATION.LizingAvtoprom]: {
        [PERIOD.M12]: 1.264 / 12,
        [PERIOD.M24]: 1.528 / 24,
        [PERIOD.M36]: 1.8799 / 36,
        [PERIOD.M48]: null,
        [PERIOD.M60]: null,
    },
    [ORGANIZATION.LizingRiteil]: {
        [PERIOD.M12]: 0.108233,
        [PERIOD.M24]: 0.066566,
        [PERIOD.M36]: 0.052678,
        [PERIOD.M48]: null,
        [PERIOD.M60]: null,
    },
    [ORGANIZATION.LizingYuwil]: {
        [PERIOD.M12]: 1.34 / 12,
        [PERIOD.M24]: 1.699 / 24,
        [PERIOD.M36]: 2.16 / 36,
        [PERIOD.M48]: null,
        [PERIOD.M60]: null,
    },
    [ORGANIZATION.LizingLait]: {
        [PERIOD.M12]: 0.107,
        [PERIOD.M24]: 0.066,
        [PERIOD.M36]: 0.054,
        [PERIOD.M48]: null,
        [PERIOD.M60]: null,
    },
    [ORGANIZATION.LizingSmart]: {
        [PERIOD.M12]: null,
        [PERIOD.M24]: 0.0617,
        [PERIOD.M36]: 0.054,
        [PERIOD.M48]: null,
        [PERIOD.M60]: null,
    },
    [ORGANIZATION.LizingAkcept]: {
        [PERIOD.M12]: 1.239 / 12,
        [PERIOD.M24]: 1.47889 / 24,
        [PERIOD.M36]: 1.648937 / 36,
        [PERIOD.M48]: 1.718137 / 48,
        [PERIOD.M60]: null,
    },
};
