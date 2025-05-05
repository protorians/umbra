export function safeString(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
}

export function unSafeString(text: string) {
  return text
    .replace(/&amp/g, '&')
    .replace(/&apos/g, "'")
    .replace(/&quot/g, '"')
    .replace(/&gt/g, '>')
    .replace(/&lt/g, '<')
}

export function addSlashes(text: string) {
  return text.replace(new RegExp("'", 'g'), "\\'")
}

export function stripSlashes(text: string) {
  return text.replace(new RegExp("\\'", 'g'), "'")
}

export function stripHTMLTags(text: string): string {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}

export function unCamelCase(value: string, separator = '-'): string {
  let t =  value.replace(/[A-Z]/g, letter => `${separator}${letter.toLowerCase()}`);
  t = t.startsWith('-') && !t.startsWith('--')
      ? t.slice(1) : t;
  return t
}

export function camelCase(value: string): string {
  return value.trim().replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
}

export function fixExponent(x: number) {
  let value = `${x}`
  if (Math.abs(x) < 1.0) {
    let e = parseInt(x.toString().split('e-')[1])
    if (e) {
      x *= Math.pow(10, e - 1);
      value = `0.${new Array(e).join('0')}${x.toString().substring(2)}`
    }
  } else {
    let e = parseInt(x.toString().split('+')[1])
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e)
      value = `${x}${(new Array(e + 1)).join('0')}`
    }
  }
  return value;
}

export function slugify(str: string): string {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  const from = "ãàáäâáº½èéëêìíïîõòóöôùúüûñç·/_,:;";
  const to = "aaaaaeeeeeiiiiooooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return str;
}

export function ucFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function lcFirstLetter(value: string) {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

export function trimSpace(data: string) {
  return data.replace(/ /g, '')
}

export function ucWords(data: string, strict: boolean = false): string {
  return data.split(' ').map(frag => frag.charAt(0).toUpperCase() + (strict ? frag.slice(1).toLowerCase() : frag.slice(1))).join(' ');
}

export function randomName(length: number = 10) {
  const provider = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let out: string[] = [];

  for (let index = 0; index < length; index++) {
    out.push(provider.charAt(Math.floor(Math.random() * provider.length)))
  }

  return out.join('');
}

export function logTime(date?: Date) {
  return (date || (new Date())).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
}

export function logDateTime(date?: Date) {
  return (date || (new Date())).toLocaleTimeString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
}

export function snapSequence(rex: RegExp, input: string): string {
    let x = 0;
    return input.replace(rex, () => `$${++x}`);
}

export function parseSequence(sequence: string, dictionary: (string | number)[]): string {
    let x = 0;
    return sequence.replace(/\$\d+/g, () => `${dictionary[x++] || ""}`);
}