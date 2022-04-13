import formatMonthAndYear from "./formatMonthAndYear.js";

export default function formatComparativeAnswerNpsColumn(answers) {
  const result = [];
  var helperLastValue = "2022";
  var pos = -1;
  for (const answer of answers) {
    const actualDate = formatMonthAndYear(answer.created_at);

    if (actualDate !== helperLastValue) {
      helperLastValue = actualDate;
      pos++;
      result.push({
        type: "Promotores",
        value: 0,
        time: actualDate,
      });
      result.push({
        type: "Neutros",
        value: 0,
        time: actualDate,
      });
      result.push({
        type: "Detratores",
        value: 0,
        time: actualDate,
      });
    }
    if (answer.nps > 8) {
      result[pos].value++;
    } else if (answer.nps > 6) {
      result[pos + 1].value++;
    } else {
      result[pos + 2].value++;
    }
  }

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

  const resultado = result.map((data, index) => {
    const total =
      data[3 * index].value +
      data[3 * index + 1].value +
      data[3 * index + 2].value;
    const promoter = data[3 * index].value;
    const detractor = data[3 * index + 2].value;

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
    nps: resultado.flat(1),
    type: "NPS",
    nick: "NPS Geral",
  };
}
