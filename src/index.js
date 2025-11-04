var RGX = /^(-?(?:\d+)?\.?\d+) *(b(?:ytes?)?)?(k(?:b|ilo(?:bytes?)?)?)?(m(?:b|ega(?:bytes?)?)?)?(g(?:b|iga(?:bytes?)?)?)?(t(?:b|era(?:bytes?)?)?)?(p(?:b|eta(?:bytes?)?)?)?$/,
	KB = 1024,
	MB = KB * 1024,
	GB = MB * 1024,
	TB = GB * 1024,
	PB = TB * 1024;

export function parse(val) {
	var num, arr = val.toLowerCase().match(RGX);
	if (arr != null && (num = parseFloat(arr[1]))) {
		if (arr[3] != null) return num * KB;
		if (arr[4] != null) return num * MB;
		if (arr[5] != null) return num * GB;
		if (arr[6] != null) return num * TB;
		if (arr[7] != null) return num * PB;
		return num;
	}
}

function fmt(val, pfx, str, long) {
	var num = (val | 0) === val ? val : ~~(val + 0.5);
	return pfx + num + (long ? (' ' + str + (num != 1 ? 's' : '')) : str);
}

export function format(num, long) {
	var pfx = num < 0  ? '-' : '', abs = num < 0 ? -num : num;
	if (abs < KB) return num + (long ? ' B' : 'B');
	if (abs < MB) return fmt(abs / KB, pfx, long ? 'kilobyte' : 'KB', long);
	if (abs < GB) return fmt(abs / MB, pfx, long ? 'megabyte' : 'MB', long);
	if (abs < TB) return fmt(abs / GB, pfx, long ? 'gigabyte' : 'GB', long);
	if (abs < PB) return fmt(abs / TB, pfx, long ? 'terabyte' : 'TB', long);
	return fmt(abs / PB, pfx, long ? 'petabyte' : 'PB', long);
}
