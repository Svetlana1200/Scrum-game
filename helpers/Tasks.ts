import { Advertising, Metric, Role } from "./Roles";

interface Task {
    id: number;
    time: number;
    finishDate: Date;
    createDate: Date;
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
    'кнопку паузы': new Feature('кнопку паузы', Role.AUTHOR, 1, 1, 1),
    'кнопку прогресс бар': new Feature('кнопку прогресс бар', Role.AUTHOR, 1, 1, 1)
}

export const results: {[key: string]: Result} = {
    'загружать музыку': new Result('загружать музыку', features['кнопку загрузки музыки'], 1, 1, 1),
    'останавливать прослушивание музыки': new Result('останавливать прослушивание музыки', features['кнопку паузы'], 1, 1, 1),
    'видеть сколько будет загружаться песня': new Result('видеть сколько будет загружаться песня', features['кнопку прогресс бар'], 1, 1, 1)
}


export class BaseTask implements Task {
    id: number;
    time: number;
    createDate: Date;
    isFinish?: boolean;

    constructor(id: number, time: number, createDate: Date) {
        this.time = time;
        this.id = id;
        this.createDate = new Date(createDate)
    }

    get finishDate(): Date {
        return new Date(this.createDate.getFullYear(), this.createDate.getMonth() + this.time, this.createDate.getDate());
    }

    get description(): string {
        return ''
    }
    generateResult(): object {
        return {}
    }
}

export class SimpleTask extends BaseTask {
    role: Role;
    feature: Feature;
    result: Result;
    coefIncome: number;
    coefUsers: number;
    resultTask: object = {};
    profitUsers: number = 0;
    profitARPU: number = 0;
    realCost: number;
    measuredCost: number;

    constructor(id: number, time: number, createDate: Date, role: Role, feature: Feature, result: Result) {
        super(id, time, createDate)
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
        this.realCost = Math.random(); //
        this.measuredCost = Math.random(); //

        this.coefUsers = Math.random();
        this.coefIncome = Math.random();
    }

    generateResult(): object {
        return {}
    }

    get description(): string {
        return `Как ${this.role}, я хочу ${this.feature.description}, чтобы ${this.result.description}`
    }
}

export class MetricTask extends BaseTask {
    analyzeTime: number;
    name: Metric;
    
    constructor(id: number, time: number, createDate: Date, analyzeTime: number, name: Metric) {
        super(id, time, createDate)
        this.analyzeTime = analyzeTime;
        this.name = name;
    }

    get description(): string {
        return `Анализ по метрике ${this.name} за последние ${this.analyzeTime} месяцев`
    }
}

export class AdvertisingTask extends BaseTask {
    name: Advertising;
    resultTask: object = {}
    
    constructor(id: number, time: number, createDate: Date, name: Advertising) {
        super(id, time, createDate)
        this.name = name;
    }

    generateResult(): object {

        switch(this.name) {
            case Advertising.LITTLE:
                Math.random()
            case Advertising.MEDIUM:
                Math.random() * 2
            case Advertising.BIG:
                Math.random() * 3
            default:
                break
        }

        return {}
    }

    get description(): string {
        return `Проведение ${this.name} рекламной компании`
    }
}
