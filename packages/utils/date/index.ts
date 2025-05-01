import { type DateArg, format } from 'date-fns';
import { ko } from 'date-fns/locale';

type DateFormat = 'a h m' | 'MM dd' | 'yy M d' | 'yy M d HH m ss';

export function dateFormat(value: DateArg<Date>, dateFormat: DateFormat = 'yy M d'): string {
  return format(value, dateFormat, { locale: ko });
}
