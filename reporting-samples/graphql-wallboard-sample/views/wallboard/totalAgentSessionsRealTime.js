let fetchData = async () => {
  try {
    const results = await fetch("http://localhost:3000/totalAgentSessionsRealTime");
    const response = await results.json();
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const ctx = document.getElementById("totalAgentSessionsRealTime");

export const totalAgentSessionsRealTime = new Chart(ctx, {
  type: "bar",
  data: {
    // labels: ["no active calls"],
    datasets: [
      {
        label: "Total Active Calls",
        // data: [10],
        backgroundColor: ["rgba(101, 101, 101,1)"],
        hoverOffset: 4,
        borderColor: ["rgba(101, 101, 101,1)"]
      }
    ]
  },
  options: {
    cutout: 120,
    aspectRatio: 1,
    layout: {
      padding: {
        left: 10,
        right: 30,
        top: 0,
        bottom: 20
      }
    },
    plugins: {
      labels: {
        render: "value",
        fontColor: ["rgba(243,130,157,1)"],
        fontSize: 120,
        fontStyle: "bolder",
        textMargin: -140,
        position: "outside",
        textShadow: true,
        shadowBlur: 7,
        shadowColor: "rgba(0,0,0,0.75)",
        shadowOffsetX: -5,
        shadowOffsetY: 10
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "white",
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: "Total Agent Sessions RealTime",
        color: "white",
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        ticks: {
          display: false,
          color: "white",
          font: {
            size: 12
          }
        },
        grid: {
          display: false
        }
      },
      x: {
        ticks: {
          display: false,
          color: "white",
          font: {
            size: 12
          }
        },
        grid: {
          display: false
        }
      }
    }
  }
});

async function updateChart() {
  try {
    const empty = [1];
    const arrFromQuery = await fetchData();
    const agentName = arrFromQuery.map(name => {
      return name.aggregation[0].name;
    });
    const activeTotal = arrFromQuery.map(value => {
      return value.aggregation[0].value;
    });

    const epFontColor = arrFromQuery.map(() => {
      return "rgba(254,216,124,1)";
    });
    if (totalAgentSessionsRealTime.data.datasets[0].data.length > 0) {
      totalAgentSessionsRealTime.data.datasets[0].data.length = 0;
    }
    totalAgentSessionsRealTime.data.labels.push(...agentName);
    if (arrFromQuery.length !== 0) {
      totalAgentSessionsRealTime.data.datasets[0].data.push(...activeTotal);
      totalAgentSessionsRealTime.options.plugins.labels.render = "value";
      totalAgentSessionsRealTime.options.plugins.labels.fontSize = "120";
      totalAgentSessionsRealTime.options.plugins.labels.textShadow = true;
      totalAgentSessionsRealTime.data.labels = [""];
    } else {
      totalAgentSessionsRealTime.data.labels = ["no active calls"];
      totalAgentSessionsRealTime.data.datasets[0].data.push(...empty);
      totalAgentSessionsRealTime.options.plugins.labels.fontSize = "40";
      totalAgentSessionsRealTime.options.plugins.labels.textShadow = false;
      totalAgentSessionsRealTime.options.plugins.labels.render = "label";
    }
    totalAgentSessionsRealTime.options.plugins.labels.fontColor = epFontColor;
    totalAgentSessionsRealTime.update();
  } catch (error) {
    // console.log(`a bit of a hic-up`);
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  setTimeout(() => {
    setInterval(async () => {
      updateChart();
    }, 5000);
  }, 4000);

  // updateChart();
});
