import { Advertising, Interview, Metric, Role, Status } from "./Roles";

interface Task {
    id: number;
    isFinish?: boolean;
    description: string;
}

export class Feature {
    description: string;
    validRole: Role;
    cost: number;
    profitUsers: number;
    profitARPU: number;

    constructor(description: string, validRole: Role, cost: number, profitUsers: number, profitARPU: number) {
        this.description = description;
        this.validRole = validRole;
        this.cost = cost;
        this.profitUsers = profitUsers;
        this.profitARPU = profitARPU;
    }
}
export class Result {
    description: string;
    feature: Feature;
    cost: number;
    profitUsers: number;
    profitARPU: number;
 
    constructor(description: string, feature: Feature, cost: number, profitUsers: number, profitARPU: number) {
        this.description = description;
        this.feature = feature;
        this.cost = cost;
        this.profitUsers = profitUsers;
        this.profitARPU = profitARPU;
    }
}

export const features: {[key: string]: Feature} = {
    'кнопку загрузки музыки': new Feature('кнопку загрузки музыки', Role.AUTHOR, 1, 1, 1),
    'кнопку паузы': new Feature('кнопку паузы', Role.LISTENER, 1, 1, 1),
    'кнопку прогресс бар': new Feature('кнопку прогресс бар', Role.AUTHOR, 1, 1, 1),
    'сортировку песен': new Feature('сортировку песен', Role.LISTENER, 1, 1, 1),
    'загружать подкасты': new Feature('загружать подкасты', Role.AUTHOR, 1, 1, 1),
    'историю прослушиваний': new Feature('историю прослушиваний', Role.LISTENER, 1, 1, 1),
    'ускорять запись': new Feature('ускорять запись', Role.MODERATOR, 1, 1, 1),
    'отметку NSFW': new Feature('отметку NSFW', Role.MODERATOR, 1, 1, 1),
    'топ песен': new Feature('топ песен', Role.MODERATOR, 1, 1, 1)
}

export const results: {[key: string]: Result} = {
    'загружать музыку': new Result('загружать музыку', features['кнопку загрузки музыки'], 1, 1, 1),
    'останавливать прослушивание музыки': new Result('останавливать прослушивание музыки', features['кнопку паузы'], 1, 1, 1),
    'видеть сколько будет загружаться песня': new Result('видеть сколько будет загружаться песня', features['кнопку прогресс бар'], 1, 1, 1),
    'было быстрее проверять контент': new Result('было быстрее проверять контент', features['ускорять запись'], 1, 1, 1),
    'иметь дополнительную прибыль': new Result('иметь дополнительную прибыль', features['загружать подкасты'], 1, 1, 1),
    'смотреть, что слушал вчера': new Result('смотреть, что слушал вчера', features['историю прослушиваний'], 1, 1, 1),
    'удобно управлять коллекцией': new Result('удобно управлять коллекцией', features['сортировку песен'], 1, 1, 1),
    'помечать общественно неприемлимый контент': new Result('помечать общественно неприемлимый контент', features['отметку NSFW'], 1, 1, 1),
    'быть в тренде': new Result('быть в тренде', features['топ песен'], 1, 1, 1)
}


export class BaseTask implements Task {
    status: Status = Status.NEW
    id: number;
    realCost: number;
    measuredCost: number;
    probabilityCompletion: number;
    isFinish?: boolean;
    inCurrentSprint: boolean = false;
    canRemove: boolean;

    constructor(id: number, realCost: number, measuredCost: number, probabilityCompletion: number, canRemove: boolean = true) {
        this.id = id;
        this.realCost = realCost;
        this.measuredCost = measuredCost;
        this.probabilityCompletion = probabilityCompletion;
        this.canRemove = canRemove;
    }

    get description(): string {
        return ''
    }
}

export class SimpleTask extends BaseTask {
    role: Role;
    feature: Feature;
    result: Result;
    profitUsers: number = 0;
    profitARPU: number = 0;

    constructor(id: number, role: Role, feature: Feature, result: Result) {
        const realCost = Math.floor(Math.random() * 4) + 1; // 1 2 3 4
        const probabilityOfCostChange = Math.floor(Math.random() * 10) + 1;
        let measuredCost = 0;
        if (probabilityOfCostChange === 10 && realCost < 4)
            measuredCost = realCost + 1;
        else if (probabilityOfCostChange === 1 && realCost > 1)
            measuredCost = realCost - 1
        else 
            measuredCost = realCost;

        super(id, realCost, measuredCost, Math.floor(Math.random() * 31) + 70)
        this.role = role;
        this.feature = feature;
        this.result = result;
        if (feature.validRole === role) {
            this.profitUsers += feature.profitUsers * 10;
            this.profitARPU += feature.profitARPU * 10;
        }
        else {
            this.profitUsers += feature.profitUsers;
            this.profitARPU += feature.profitARPU;
        }
        if (result.feature.description === feature.description) {
            this.profitUsers += feature.profitUsers * 10;
            this.profitARPU += feature.profitARPU * 10;
        }
        else {
            this.profitUsers += feature.profitUsers;
            this.profitARPU += feature.profitARPU;
        }
        
    }

    get description(): string {
        return `Как ${this.role}, я хочу ${this.feature.description}, чтобы ${this.result.description}`
    }
}

export class MetricTask extends BaseTask {
    name: Metric;
    
    constructor(id: number, name: Metric) {
        super(id, 1, 1, 100)
        this.name = name;
    }

    get description(): string {
        return `Анализ по метрике ${this.name}`
    }
}

export class AdvertisingTask extends BaseTask {
    static countSprints = {
        [Advertising.BIG]: 3,
        [Advertising.MEDIUM]: 2,
        [Advertising.LITTLE]: 1
    }
    static profits = {
        [Advertising.BIG]: 40,
        [Advertising.MEDIUM]: 15,
        [Advertising.LITTLE]: 5
    }
    size: Advertising;
    estimatingSprint: number;
    profitUsers: number;

    constructor(id: number, size: Advertising) {
        super(id, AdvertisingTask.countSprints[size], AdvertisingTask.countSprints[size], 100, false);
        this.size = size;
        this.estimatingSprint = AdvertisingTask.countSprints[size];
        this.profitUsers = AdvertisingTask.profits[size]
    }

    get description(): string {
        return `Проведение ${this.size} рекламной компании`
    }
}

export class InterviewTask extends BaseTask {
    name: Interview;
    countNewResults: number = Math.floor(Math.random() * 2) + 1
    countNewFeatures: number = Math.floor(Math.random() * 2) + 1

    constructor(id: number, name: Interview) {
        super(id, 2, 2, 100)
        this.name = name;
    }

    get description(): string {
        return `Проведение ${this.name} опроса`
    }
}