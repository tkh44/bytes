import { test } from 'uvu';
import * as assert from 'uvu/assert';
import * as bytes from '../src';

function parse(input, expect) {
	const output = bytes.parse(input);
	assert.is(output, expect, `parse("${input}") ~> ${expect}`);
	assert.is(typeof output, typeof expect, `~> returns "${typeof expect}" type`);
}

function format(input, expect, long) {
	const output = bytes.format(input, long);
	assert.is(output, expect, `format(${input}) ~> "${expect}"`);
	assert.is(typeof output, typeof expect, `~> returns "${typeof expect}" type`);
}

// ---

test('exports an object', () => {
	assert.type(bytes, 'object');
});

test('exports "parse" function', () => {
	assert.type(bytes.parse, 'function');
});

test('exports "format" function', () => {
	assert.type(bytes.format, 'function');
});


test('parse()', () => {
	parse('100', 100);
	parse('1kb', 1024);
	parse('1mb', 1048576);
	parse('2gb', 2147483648);
	parse('1tb', 1099511627776);
	parse('1b', 1);
	parse('100b', 100);
	parse('1.5kb', 1536);
	parse('1   kb', 1024);

	parse('☃', undefined);
	parse('10-.5', undefined);

	parse('1.5KB', 1536);
	parse('.5kb', 512);
	parse('-100b', -100);
	parse('-1.5kb', -1536);
	parse('-10.5kb', -10752);
	parse('-.5kb', -512);

	parse('1.5gb', 1610612736);
});


test('parse() :: long', () => {
	parse('53 bytes', 53);
	parse('1 byte', 1);
	parse('1 kilobyte', 1024);
	parse('1 kb', 1024);
	parse('1 megabyte', 1048576);
	parse('2 gigabytes', 2147483648);
	parse('1.5 kilobytes', 1536);
	parse('-100 bytes', -100);
	parse('-1.5 kilobytes', -1536);
	parse('-.5 kb', -512);

	parse('1.5 gigabytes', 1610612736);
	parse('1 tb', 1099511627776);
	parse('6 terabytes', 6597069766656);
});


test('format()', () => {
	format(500, '500B');
	format(-500, '-500B');

	// kilobytes
	const KB = 1024;
	format(KB, '1KB');
	format(KB * 10, '10KB');
	format(KB * -10, '-10KB');
	format(KB * -1, '-1KB');

	// megabytes
	const MB = KB * 1024;
	format(MB, '1MB');
	format(MB * 10, '10MB');
	format(MB * -10, '-10MB');
	format(MB * -1, '-1MB');

	// gigabytes
	const GB = MB * 1024;
	format(GB, '1GB');
	format(GB * 10, '10GB');
	format(GB * -10, '-10GB');
	format(GB * -1, '-1GB');

	// terabytes
	const TB = GB * 1024;
	format(TB, '1TB');
	format(TB * 10, '10TB');
	format(TB * -10, '-10TB');
	format(TB * -1, '-1TB');

	// petabytes
	const PB = TB * 1024;
	format(PB, '1PB');
	format(PB * 10, '10PB');
	format(PB * -10, '-10PB');
	format(PB * -1, '-1PB');

	// rounding
	format(1536, '2KB');
	format(-1536, '-2KB');
});


test('format() :: long', () => {
	// bytes
	format(500, '500 B', true);
	format(-500, '-500 B', true);

	// kilobytes
	format(1024, '1 kilobyte', true);
	format(1536, '2 kilobytes', true);
	format(10240, '10 kilobytes', true);
	format(-1024, '-1 kilobyte', true);
	format(-1536, '-2 kilobytes', true);
	format(-10240, '-10 kilobytes', true);

	// megabytes
	format(1048576, '1 megabyte', true);
	format(1572864, '2 megabytes', true);
	format(10485760, '10 megabytes', true);
	format(-1048576, '-1 megabyte', true);
	format(-1572864, '-2 megabytes', true);
	format(-10485760, '-10 megabytes', true);

	// gigabytes
	format(1073741824, '1 gigabyte', true);
	format(1610612736, '2 gigabytes', true);
	format(10737418240, '10 gigabytes', true);
	format(-1073741824, '-1 gigabyte', true);
	format(-1610612736, '-2 gigabytes', true);
	format(-10737418240, '-10 gigabytes', true);

	// terabytes
	format(1099511627776, '1 terabyte', true);
	format(1649267441664, '2 terabytes', true);
	format(10995116277760, '10 terabytes', true);
	format(-1099511627776, '-1 terabyte', true);
	format(-1649267441664, '-2 terabytes', true);
	format(-10995116277760, '-10 terabytes', true);

  // rounding
	format(1536, '2 kilobytes', true);
	format(-1536, '-2 kilobytes', true);
});


test.run();
