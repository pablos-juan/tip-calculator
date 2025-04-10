# Tip Calculator

Una calculadora de propinas simple pero funcional. Permite ingresar el valor total de una cuenta, seleccionar o escribir un porcentaje de propina, definir el número de personas que pagarán, y calcular automáticamente cuánto debe pagar cada persona (tanto de propina como en total).

---

## 🛠 Sobre el proyecto

Este es mi primer proyecto personal. Tomé como base un diseño de una plataforma para practicar desarrollo web front-end. Decidí implementarlo usando **React** con **Vite**, sin apoyarme en la plantilla oficial de React para Vite. Esto me permitió comprender mejor el proceso de configuración desde cero y aplicar conceptos fundamentales como:

- Componentes reutilizables
- Hooks estándar (`useState`, `useEffect`)
- Custom Hooks

### ⚙️ Proceso de configuración

1. Inicialicé el proyecto con Vite usando la plantilla `vanilla`:
   ```bash
   npm create vite@latest
   ```
2. Instalé React manualmente junto con su plugin para Vite:
   ```bash
   npm install react react-dom
   npm install --save-dev @vitejs/plugin-react
   ```
3. Configuré `vite.config.js` con el plugin:
   ```js
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()]
   })
   ```
4. Creé el punto de entrada de la app utilizando `createRoot` desde `react-dom/client`.  
   > Nota: el plugin de Vite no soporta JSX en archivos `.js`, por lo que fue necesario cambiar la extensión a `.jsx`.

---

## 🧪 Problemas y soluciones

Durante el desarrollo enfrenté algunos desafíos, especialmente en la parte lógica y de rendimiento:

- **Estado activo de botones**: Cada botón representa un porcentaje de propina. Al hacer clic, se activa visualmente. Para lograr esto, guardé el valor del botón activo en el estado y apliqué clases condicionales. Funcionó, pero los estilos se actualizaban lentamente.

- **Optimización con `useMemo`**: Para mejorar el rendimiento, memoricé el renderizado de los botones usando `useMemo`, de modo que solo se recalcularan cuando el valor del estado `tip` cambiara. Esto alivió el problema, aunque lo considero una solución provisional y planeo refinarla más adelante.

## todo

- Mejorar el `useMemo`.
