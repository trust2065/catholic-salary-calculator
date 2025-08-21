# Time Recording System

This project is a time recording system that tracks working hours, break times (including unpaid and paid breaks), and allows users to input the date for each entry.

## Features

- Record working hours with start and end times.
- Input for break times, distinguishing between paid and unpaid breaks.
- Date input field for each time entry.
- Display a list of recorded time entries.

## Project Structure

```
time-recording-system
├── src
│   ├── components
│   │   ├── TimeEntryForm.tsx
│   │   ├── TimeEntryList.tsx
│   │   └── BreakTypeSelector.tsx
│   ├── pages
│   │   └── index.tsx
│   ├── types
│   │   └── index.ts
│   └── utils
│       └── timeUtils.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd time-recording-system
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the development server, run:
```
npm run dev
```

Open your browser and go to `http://localhost:3000` to access the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you would like to add.

## License

This project is licensed under the MIT License.