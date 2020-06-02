import { Injectable } from "@angular/core";
import * as constant from '../util/constant';

@Injectable({
  providedIn: "root",
})
export class HelperService {
    constructor() {}

    writeToLocalStorage(user: any) {
        localStorage.setItem(constant.PIZZERIA_KEY, this.encodeString(JSON.stringify(user)));
    }

    removeFromLocalStorage() {
        localStorage.removeItem(constant.PIZZERIA_KEY);
    }

    getObjectFromLocalStorage(): string {
        const loginInfoFromLocalStorage = localStorage.getItem(constant.PIZZERIA_KEY);
        if(loginInfoFromLocalStorage !== null) {
            return this.decodeString(loginInfoFromLocalStorage)
        }
        return undefined;
    }

    encodeString(s: string): string {
        return btoa(s);
    }

    decodeString(s: string): string {
        return atob(s);
    }
}
