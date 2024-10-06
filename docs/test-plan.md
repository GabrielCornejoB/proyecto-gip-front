# Test Plan

## Descripción de la solución

DataGIP es un proyecto desarrollado con el fín de apoyar al Grupo de Investigación de Psicología y al Centro de Atención psicológica de la UPB. Este proyecto cuenta con herramientas que permiten:

- Carga y actualización continua de datos de consultas, para posteriormente visualizar modelos visuales y gráficas que pueden apoyar a la toma de decisiones.
- Modelos predictivos y descriptivos que permiten según una consulta, obtener resultados generados por medio de Inteligencia Artificial.

## Descripción de los features a probar

### **Feature** Carga de archivos

La funcionalidad de carga de archivos permite a los usuarios a cargar sus archivos de RIPS y de reportes mensuales, para posteriormente ser almacenados en la base de datos a la cual se conectan los tableros de visualización. Este proceso consta primero de unas validaciones que indican si los archivos son válidos o no, la encriptación (del lado del cliente) de las cédulas de los pacientes, la limpieza de los datos y por último la carga de los mismos.

### **Feature** Modelo de IA Diagnostico

> 🚧 **En Construcción**
> 
> Esta funcionalidad aún se encuentra en desarrollo

## Alcance

Para las pruebas se evaluarán los siguientes escenarios de los flujos mencionados previamente:

- Carga de archivos
  - Carga de archivos exitosa
  - Carga de archivos fallida cuando archivos no tienen formato válido
  - Carga de archivos fallida cuando no tienen campo de Cédula para encriptar
  - Carga de archivos fallida cuando no se envían los campos requeridos en los archivos
- IA Diagnostica

## Estrategia

Para validar los escenarios planteados previamente se usarán las siguientes herramientas para las pruebas:

- Pruebas exploratorias manuales.
- Pruebas unitarias o de unidad con **Jest**.
- Pruebas de UI (E2E y aceptación) con **Playwright**
