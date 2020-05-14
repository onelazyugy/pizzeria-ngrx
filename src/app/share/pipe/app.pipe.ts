import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'trimTextPipe' })
export class TrimTextPipe implements PipeTransform {
    transform(value: string, length: number): string {
        if (value.length > length && !isNaN(length)) {
            value = value.substring(0, length) + '...';
        }
        return value;
    }
}

@Pipe({ name: 'uppercaseTextPipe' })
export class UppercaseTextPipe implements PipeTransform {
    transform(value: string): string {
        return value.toUpperCase();
    }
}