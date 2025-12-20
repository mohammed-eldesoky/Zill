import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

   transform(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 5) return 'just now';

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const unit in intervals) {
      const interval = Math.floor(seconds / intervals[unit]);

      if (interval >= 1) {
        return `${interval} ${this.pluralize(unit, interval)} ago`;
      }
    }

    return 'just now';
  }

  private pluralize(unit: string, value: number): string {
    return value > 1 ? `${unit}s` : unit;
  }

}
