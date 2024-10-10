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
> Esta funcionalidad aún se encuentra en desarrollo. Pero consta de un modelo de aprendizaje el cual con la información que se tiene de las consultas el cual puede predecir según datos socio-demográficos posibles síntomas o diagnósticos que tenga un paciente. El usuario final podrá realizar las consultas por medio de un formulario dentro del mismo aplicativo.

## **Feature** Modelo de Clustering de usuarios

> 🚧 **En Construcción**
> 
> Esta funcionalidad aún se encuentra en desarrollo.

## Alcance

Para este plan de pruebas se abarcarán únicamente pruebas funcionales, las cuales validan la lógica de negocio del aplicativo. Para estas pruebas funcionales se evaluarán los siguientes escenarios de los flujos mencionados previamente:

- Carga de archivos
	- Carga de archivos exitosa
	- Carga de archivos fallida cuando archivos no tienen formato válido
	- Carga de archivos fallida cuando no tienen campo de Cédula para encriptar
	- Carga de archivos fallida cuando no se envían los campos requeridos en los archivos
	- Carga de archivos fallida por error de conexión con servidor
- IA Diagnostica
	- Visualización de consultas previas exitosas
	- Error al visualizar consultas previas por error de conexión con servidor
	- Generar nueva consulta exitosamente
	- Error al generar nueva consulta por formulario no valido
	- Error al generar nueva consulta por error de conexión con el servidor
- Clustering de usuarios
> 	🚧 **En Construcción**
> 
> 	Esta funcionalidad aún se encuentra en desarrollo

Para esta solución los siguientes tipos de pruebas están por fuera del alcance:
- Pruebas de integración backend
- Pruebas de humo (Smoke Test)
- Pruebas de performance E2E
- Pruebas de performance modulares

## Estrategia

Para validar los escenarios planteados previamente se tendrán los siguientes tipos de pruebas y con las siguientes herramientas:

- Pruebas exploratorias manuales.
- Pruebas unitarias o de unidad con **Jest**.
- Pruebas de UI (E2E y aceptación) con **Playwright**

## Supuestos y Limitaciones

- Se debe contar con un ambiente "pre-productivo" donde realizar las pruebas el cual debe ser lo más cercano al ambiente productivo en cuanto a capacidad y datos.
- Este ambiente pre-productivo debe mantenerse estable para permitir la ejecución de las pruebas
- Se cuenta con las herramientas necesarias para la ejecución de pruebas
- Se validaron los distintos criterios de aceptación y escenarios que tiene cada funcionalidad
- Pueden haber problemas al ejecutar una gran cantidad de pruebas por la capa gratuita que presentan Vercel y GitHub
- La instancia de Supabase (base de datos y autenticación) puede apagarse automáticamente si no se le da un uso constante, impidiendo el correcto funcionamiento de las pruebas.

# Equipo de Trabajo

- Tomas Cardona Montoya
- Gabriel Sebastián Cornejo Botero
- Susana Gutierrez García
- Jose Alejandro Rivillas Jimenez
- Sebastián Sanchez Granados
