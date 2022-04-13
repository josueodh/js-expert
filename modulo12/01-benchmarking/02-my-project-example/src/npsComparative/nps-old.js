import formatMonthAndYear from "./formatMonthAndYear.js";

export default function formatComparativeAnswerNpsColumn(answers) {
  const uniqueDate = Array.from(
    new Set(answers.map((answer) => formatMonthAndYear(answer.created_at)))
  );

  const formatAnswer = uniqueDate
    .map((unique) => {
      return [
        {
          type: "Promotores",
          value: 0,
          time: unique,
        },
        {
          type: "Neutros",
          value: 0,
          time: unique,
        },
        {
          type: "Detratores",
          value: 0,
          time: unique,
        },
      ];
    })
    .flat(1);

  answers.forEach((answer) => {
    const index = uniqueDate.findIndex(
      (unique) => unique === formatMonthAndYear(answer.created_at)
    );
    if (index >= 0) {
      if (answer.nps > 8) {
        formatAnswer[index * 3].value++;
      } else if (answer.nps > 6) {
        formatAnswer[index * 3 + 1].value++;
      } else {
        formatAnswer[index * 3 + 2].value++;
      }
    }
  });

  const cumulativeNps = [
    {
      name: "Total",
      value: 0,
    },
    {
      name: "Promotores",
      value: 0,
    },
    {
      name: "Detratores",
      value: 0,
    },
  ];

  const result = uniqueDate.map((data, index) => {
    const total =
      formatAnswer[3 * index].value +
      formatAnswer[3 * index + 1].value +
      formatAnswer[3 * index + 2].value;
    const promoter = formatAnswer[3 * index].value;
    const detractor = formatAnswer[3 * index + 2].value;

    if (total === 0) {
      return [
        {
          value: 0,
          time: data,
          name: "NPS Mensal",
        },
        { value: 0, time: data, name: "NPS Acumulado" },
      ];
    } else {
      cumulativeNps[0].value += total;
      cumulativeNps[1].value += promoter;
      cumulativeNps[2].value += detractor;
      return [
        {
          value: Number(((100 * (promoter - detractor)) / total).toFixed(1)),
          time: data,
          name: "NPS Mensal",
        },
        {
          value: Number(
            (
              (100 * (cumulativeNps[1].value - cumulativeNps[2].value)) /
              cumulativeNps[0].value
            ).toFixed(1)
          ),
          time: data,
          name: "NPS Acumulado",
        },
      ];
    }
  });

  return {
    data: formatAnswer,
    nps: result.flat(1),
    type: "NPS",
    nick: "NPS Geral",
  };
}
