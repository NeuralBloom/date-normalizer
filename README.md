# date-normalizer

A lightweight utility library for date string normalization. This library helps developers handle various date string formats and convert them into standardized outputs with zero dependencies.

## Features

- 📅 Support for multiple date formats:
  - ISO (YYYY-MM-DD)
  - US (MM/DD/YYYY)
  - EU (DD/MM/YYYY)
  - Verbose (Month DD, YYYY)
- ✨ Format detection and conversion
- 🛡️ Built-in validation
- 📦 Zero dependencies
- 💪 TypeScript support
- 🌐 Browser and Node.js compatible

## Installation

```bash
npm install date-normalizer
```

## Usage

### Basic Usage

```typescript
import { normalizeDateString } from 'date-normalizer';

// Convert from US format to ISO
const isoDate = normalizeDateString('12/25/2024', { outputFormat: 'ISO' });
console.log(isoDate); // '2024-12-25'

// Convert from ISO to EU format
const euDate = normalizeDateString('2024-12-25', { outputFormat: 'EU' });
console.log(euDate); // '25/12/2024'

// Convert to verbose format
const verboseDate = normalizeDateString('2024-12-25', { outputFormat: 'VERBOSE' });
console.log(verboseDate); // 'December 25, 2024'
```

### Format Detection

```typescript
import { detectDateFormat } from 'date-normalizer';

console.log(detectDateFormat('2024-12-25')); // 'ISO'
console.log(detectDateFormat('12/25/2024')); // 'US'
console.log(detectDateFormat('25/12/2024')); // 'EU'
console.log(detectDateFormat('December 25, 2024')); // 'VERBOSE'
```

### Validation

```typescript
import { isValidDateString } from 'date-normalizer';

console.log(isValidDateString('2024-12-25')); // true
console.log(isValidDateString('2024-13-45')); // false
```

## API Reference

### normalizeDateString(dateString: string, options?: DateNormalizerOptions): string

Converts a date string from one format to another.

Options:
- `inputFormat?: string` - Specify the input format (optional, auto-detected if not provided)
- `outputFormat: string` - Desired output format ('ISO', 'US', 'EU', or 'VERBOSE')
- `locale?: string` - Locale for verbose format (default: 'en')

### detectDateFormat(dateString: string): string | null

Detects the format of a given date string. Returns one of:
- 'ISO'
- 'US'
- 'EU'
- 'VERBOSE'
- null (if format cannot be detected)

### isValidDateString(dateString: string, format?: string): boolean

Validates if a string represents a valid date in the specified format.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
