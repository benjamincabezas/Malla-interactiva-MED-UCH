const estructura = {
  "1° Semestre": ["Matemáticas", "Química", "Anatomía I", "Introducción a la Profesión Médica", "Medicina y Sociedad", "Formación General I", "Inglés I"],
  "2° Semestre": ["Física", "Biología Celular y Molecular", "Anatomía II", "Histología y Embriología", "Medicina Personal y Sociedad", "Introducción a la Salud Pública", "Inglés II"],
  "3° Semestre": ["Fisiología I", "Bioquímica", "Genética", "Unidad de Investigación I", "Semiología I", "Bioética", "Formación General II"],
  "4° Semestre": ["Fisiología II", "Inmunología", "Medicina Evolutiva", "Unidad de Investigación II", "Semiología II", "Casos Integradores I", "Epidemiología Descriptiva"],
  "5° Semestre": ["Fisiopatología I", "Farmacología I", "Agentes Vivos de la Enfermedad I", "Medicina Interna I", "Ética Clínica I", "Epidemiología Analítica", "Módulo Interdisciplinario I"],
  "6° Semestre": ["Fisiopatología II", "Farmacología II", "Agentes Vivos de la Enfermedad II", "Medicina Interna II", "Epidemiología Clínica", "Casos Integradores II"],
  "7° Semestre": ["Medicina General Familiar I", "Cirugía", "Geriatría", "Anatomía Patológica", "Ética Clínica II", "Casos Integradores III", "Formación General III"],
  "8° Semestre": ["Medicina General Familiar II", "Especialidades Médicas y Quirúrgicas I", "Neurología", "Medicina Legal", "Diagnóstico de Situación de Salud", "Seguridad Social y Atención en Salud", "Electivo Profesional I"],
  "9° Semestre": ["Pediatría y Cirugía Infantil", "Especialidades Médicas y Quirúrgicas II", "Medicina de Urgencia", "Gestión I", "Electivo Profesional II", "Casos Integradores IV", "Formación General IV"],
  "10° Semestre": ["Ginecología-Obstetricia", "Psiquiatría", "Psiquiatría Infantil", "Gestión II", "Electivo Profesional III", "Módulo Interdisciplinario II"],
  "Internado (6° año)": ["Medicina Interna", "Pediatría", "Especialidades: Urología", "Oftalmología", "Otorrinolaringología", "Dermatología"],
  "Internado (7° año)": ["Cirugía", "Obstetricia-Ginecología", "Atención Primaria Urbana", "Atención Primaria Rural", "Neurología", "Psiquiatría", "Electivo I", "Electivo II", "Traumatología", "Urgencias"]
};

const prerrequisitos = {
  "Anatomía II": ["Anatomía I"],
  "Fisiología II": ["Fisiología I"],
  "Farmacología II": ["Farmacología I"],
  "Agentes Vivos de la Enfermedad II": ["Agentes Vivos de la Enfermedad I"],
  "Medicina Interna II": ["Medicina Interna I"],
  "Psiquiatría Infantil": ["Psiquiatría"],
  "Electivo Profesional II": ["Electivo Profesional I"],
  "Electivo Profesional III": ["Electivo Profesional II"],
  "Ginecología-Obstetricia": ["Pediatría y Cirugía Infantil"],
  "Cirugía (7° año)": ["Cirugía"],
  "Electivo II": ["Electivo I"]
};

const estado = JSON.parse(localStorage.getItem('estadoRamosMed')) || {};
const contenedor = document.getElementById("malla");

Object.entries(estructura).forEach(([semestre, ramos]) => {
  const columna = document.createElement("div");
  columna.className = "semestre";

  const titulo = document.createElement("h2");
  titulo.textContent = semestre;
  columna.appendChild(titulo);

  ramos.forEach(ramo => {
    const div = document.createElement("div");
    div.className = "ramo";
    div.textContent = ramo;

    if (estado[ramo]) div.classList.add("aprobado");

    const faltantes = (prerrequisitos[ramo] || []).filter(req => !estado[req]);
    if (faltantes.length) {
      div.classList.add("bloqueado");
      const tooltip = document.createElement("span");
      tooltip.className = "tooltip";
      tooltip.textContent = `Requiere: ${faltantes.join(", ")}`;
      div.appendChild(tooltip);
    }

    div.addEventListener("click", () => {
      if (div.classList.contains("bloqueado")) return;
      div.classList.toggle("aprobado");
      estado[ramo] = div.classList.contains("aprobado");
      localStorage.setItem('estadoRamosMed', JSON.stringify(estado));
      location.reload(); // recarga para actualizar los bloqueos
    });

    columna.appendChild(div);
  });

  contenedor.appendChild(columna);
});
