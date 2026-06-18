// F1官方车手头像CDN
const DRIVER_IMG = {
  'Max Verstappen': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col-retina/image.png',
  'Lando Norris': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col-retina/image.png',
  'Oscar Piastri': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col-retina/image.png',
  'Charles Leclerc': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col-retina/image.png',
  'Lewis Hamilton': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col-retina/image.png',
  'George Russell': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col-retina/image.png',
  'Andrea Kimi Antonelli': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ANDKIM01_Andrea_Kimi_Antonelli/andkim01.png.transform/2col-retina/image.png',
  'Fernando Alonso': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col-retina/image.png',
  'Carlos Sainz': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col-retina/image.png',
  'Alexander Albon': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png.transform/2col-retina/image.png',
  'Yuki Tsunoda': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png.transform/2col-retina/image.png',
  'Isack Hadjar': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/I/ISAHAD01_Isack_Hadjar/isahad01.png.transform/2col-retina/image.png',
  'Pierre Gasly': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/2col-retina/image.png',
  'Esteban Ocon': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png.transform/2col-retina/image.png',
  'Oliver Bearman': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png.transform/2col-retina/image.png',
  'Nico Hülkenberg': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png.transform/2col-retina/image.png',
  'Gabriel Bortoleto': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GABBOR01_Gabriel_Bortoleto/gabbor01.png.transform/2col-retina/image.png',
  'Sergio Pérez': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/2col-retina/image.png',
  'Liam Lawson': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png.transform/2col-retina/image.png',
  'Lance Stroll': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/2col-retina/image.png',
  'Jack Doohan': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/J/JACDOO01_Jack_Doohan/jacdoo01.png.transform/2col-retina/image.png',
  'Franco Colapinto': 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FRACOL01_Franco_Colapinto/fracol01.png.transform/2col-retina/image.png',
}

// F1官方车队Logo
const TEAM_LOGO = {
  'Mercedes': 'https://media.formula1.com/content/dam/fom-website/teams/2025/mercedes-logo.png.transform/2col-retina/image.png',
  'Ferrari': 'https://media.formula1.com/content/dam/fom-website/teams/2025/ferrari-logo.png.transform/2col-retina/image.png',
  'McLaren': 'https://media.formula1.com/content/dam/fom-website/teams/2025/mclaren-logo.png.transform/2col-retina/image.png',
  'Red Bull': 'https://media.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing-logo.png.transform/2col-retina/image.png',
  'Red Bull Racing': 'https://media.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing-logo.png.transform/2col-retina/image.png',
  'Alpine': 'https://media.formula1.com/content/dam/fom-website/teams/2025/alpine-logo.png.transform/2col-retina/image.png',
  'Alpine F1 Team': 'https://media.formula1.com/content/dam/fom-website/teams/2025/alpine-logo.png.transform/2col-retina/image.png',
  'Aston Martin': 'https://media.formula1.com/content/dam/fom-website/teams/2025/aston-martin-logo.png.transform/2col-retina/image.png',
  'Williams': 'https://media.formula1.com/content/dam/fom-website/teams/2025/williams-logo.png.transform/2col-retina/image.png',
  'RB F1 Team': 'https://media.formula1.com/content/dam/fom-website/teams/2025/rb-logo.png.transform/2col-retina/image.png',
  'Racing Bulls': 'https://media.formula1.com/content/dam/fom-website/teams/2025/rb-logo.png.transform/2col-retina/image.png',
  'Haas': 'https://media.formula1.com/content/dam/fom-website/teams/2025/haas-logo.png.transform/2col-retina/image.png',
  'Haas F1 Team': 'https://media.formula1.com/content/dam/fom-website/teams/2025/haas-logo.png.transform/2col-retina/image.png',
  'Sauber': 'https://media.formula1.com/content/dam/fom-website/teams/2025/kick-sauber-logo.png.transform/2col-retina/image.png',
  'Audi': 'https://media.formula1.com/content/dam/fom-website/teams/2025/sauber-logo.png.transform/2col-retina/image.png',
  'Cadillac F1 Team': 'https://media.formula1.com/content/dam/fom-website/teams/2025/cadillac-logo.png.transform/2col-retina/image.png',
  'Cadillac': 'https://media.formula1.com/content/dam/fom-website/teams/2025/cadillac-logo.png.transform/2col-retina/image.png',
}

module.exports = { DRIVER_IMG, TEAM_LOGO }
