import { Advertising, Metric, Role } from "./Roles";

interface Task {
    id: number;
    time: number;
    finishDate: Date;
    createDate: Date;
    isFinish?: boolean;
    description: string;
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
    action: string;
    result: string;
    coefIncome: number;
    coefUsers: number;
    resultTask: object = {};

    constructor(id: number, time: number, createDate: Date, role: Role, action: string, result: string, coefUsers: number, coefIncome:number) {
        super(id, time, createDate)
        this.role = role;
        this.action = action;
        this.result = result;
        this.coefUsers = coefUsers;
        this.coefIncome = coefIncome;
    }

    generateResult(): object {
        return {}
    }

    get description(): string {
        return `Как ${this.role}, я хочу ${this.action}, чтобы ${this.result}`
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
