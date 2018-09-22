# App-Denuncias
Aplicación para denunciar robos que ocurren en Bogotá.
Proyecto 2 para la clase de desarrollo web Uniandes.
Desarrollado usando Node.js, Express, y React.js

# Instalación

Para hacer una instalación local del sistema, corra los siguientes comandos:
<!--Falta el importar la base de datos-->
- mongoimport -d appDenuncias -c users --jsonArray --file users.json
- mongoimport -d appDenuncias -c robos --jsonArray --file robos.json
- npm install
- npm start
- cd /frontdenuncias
- yarn install
- yarn start

# Autores

- [Juan Sebastián Díaz](https://js-diaz.github.io/)
- [Juan David Vega](https://jd-vega11.github.io/)

# License

MIT License

Copyright (c) 2018 js.diaz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
