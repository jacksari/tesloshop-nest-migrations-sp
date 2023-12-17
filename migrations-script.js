const fs = require('fs');
const path = require('path');

// Obtener el nombre de la migración de los argumentos de la línea de comandos
const migrationName = process.argv[2];

// Verificar si se proporcionó un nombre de migración
if (!migrationName) {
  console.error('Por favor, proporciona un nombre para la migración.');
  process.exit(1);
}

// Ruta del directorio de migraciones
const migrationsDirectory = './src/migrations';

// Verificar si el directorio de migraciones existe, si no, crearlo
if (!fs.existsSync(migrationsDirectory)) {
  fs.mkdirSync(migrationsDirectory, { recursive: true });
}

// Nombre del archivo de migración
const timestamp = Date.now();
const migrationFileName = `${timestamp}_${migrationName}.ts`; // Puedes ajustar la extensión si es necesario

// Ruta completa del archivo de migración
const migrationFilePath = path.join(migrationsDirectory, migrationFileName);

// Contenido del archivo de migración (puedes ajustar este contenido según tus necesidades)
const migrationContent = `import {MigrationInterface, QueryRunner} from 'typeorm';

export class ${migrationName}${timestamp} implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Agrega aquí tus operaciones de migración
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Agrega aquí las operaciones para revertir la migración
    }
}
`;

// Escribir el contenido en el archivo de migración
fs.writeFileSync(migrationFilePath, migrationContent);

console.log(
  `Se ha creado la migración '${migrationName}' en '${migrationFilePath}'`,
);
