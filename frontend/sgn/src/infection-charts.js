import React, { useRef, useEffect } from "react";
import { select, scaleBand, scaleLinear, max } from "d3";
import useResizeObserver from "./useResizeObserver";

function InfectionBarChart(infection) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;
    infection.data.sort((a, b) => b.cases - a.cases);
    const yScale = scaleBand()
      .paddingInner(0.1)
      .domain(infection.data.map((value, index) => index)) 
      .range([0, dimensions.height]); 

    const xScale = scaleLinear()
      .domain([0, max(infection.data, entry => entry.cases)]) 
      .range([0, dimensions.width]);

    svg
      .selectAll(".bar")
      .data(infection.data, (entry, index) => entry.country)
      .join(enter =>
        enter.append("rect").attr("y", (entry, index) => yScale(index))
      )
      .attr("fill", entry => entry.color)
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", yScale.bandwidth())
      .transition()
      .attr("width", entry => xScale(entry.cases))
      .attr("y", (entry, index) => yScale(index));

    svg
      .selectAll(".label")
      .data(infection.data, (entry, index) => entry.country)
      .join(enter =>
        enter
          .append("text")
          .attr(
            "y",
            (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
          )
      )
      .text(entry => `${entry.country} (${entry.cases} cases)`)
      .attr("class", "label")
      .attr("x", 10)
      .transition()
      .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);
  }, [infection.data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg height='10000' width='1400' ref={svgRef}></svg>
    </div>
  );
}

export default InfectionBarChart;
