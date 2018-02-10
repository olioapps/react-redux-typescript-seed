import * as React from "react"
import * as d3 from "d3"
// import * as d3tip from "d3-tip"

interface DataPoint {
    readonly label: string
    readonly value: number
}

type Data = ReadonlyArray<DataPoint>

interface BarChartProps {
   readonly data: Data,
   readonly width: number,
   readonly height: number,
   readonly margin: {
        readonly top: number,
        readonly right: number,
        readonly bottom: number,
        readonly left: number,
    },
}

class BarChart extends React.Component<BarChartProps, {}> {
    container: HTMLDivElement | null
    xAxis:  d3.Axis<{}>
    yAxis: d3.Axis<{}>
    svg: d3.Selection<d3.BaseType, {}, null, undefined>
    width: number
    height: number
    margin: {
        readonly top: number,
        readonly right: number,
        readonly bottom: number,
        readonly left: number,
    }
    x:  d3.ScaleBand<string>
    y: any  // tslint:disable-line no-any
    xAxisContainer: any // tslint:disable-line no-any
    yAxisContainer: any // tslint:disable-line no-any
    tip: any // tslint:disable-line no-any
    g: any // tslint:disable-line no-any

    componentDidMount(): void {
        this.initChart(this.container, this.props)
    }

    componentWillReceiveProps(nextProps: BarChartProps): void {
        // render chart with new data
        this.renderChart(nextProps.data)
    }

    initChart = (el: HTMLDivElement | null, props: BarChartProps): void => {
        this.width  = props.width  || 720
        this.height = props.height || 190
        this.margin = props.margin || {top: 5, right: 20, bottom: 30, left: 40}

        // create svg container
        this.svg = d3.select(el).append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("class", "calendar-dayview")

        // create scales
        this.x = d3
            .scaleBand().
            rangeRound([0, this.width - this.margin.left - this.margin.right])
            .padding(0.05)

        this.y = d3
            .scaleLinear().
            rangeRound([this.height - this.margin.top - this.margin.bottom, 0])

        // create padded middle container
        this.g = this.svg.append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")

        // create x axis
        this.xAxis = d3.axisBottom(this.x)
        this.xAxisContainer = this.g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (this.height - this.margin.top - this.margin.bottom) + ")")
            .call(this.xAxis)

        // create y axis
        this.yAxis = d3.axisLeft(this.y).ticks(10)
        this.yAxisContainer = this.g.append("g")
            .attr("class", "axis axis--y")
            .call(this.yAxis)

        // TODO: y axis label? "Hours" - needs to be positioned correctly
        // this.yAxisContainer
        //     .append("text")
        //     .attr("transform", "rotate(-90)")
        //     .attr("y", 6)
        //     .attr("dy", "0.71em")
        //     .text("Hours")

        // setup tooltips
        // this.tip = d3tip.tip()
        //     .attr("class", "d3-tip")
        //     // .offset([5, 0])
        //     .offset([-10, 0])
        //     .direction("n")
        //     .html(d => "<span style="font-size: 75%">
        // <strong>" + d.value + "</strong> " + this.props.valueLabel + "</span>")
        // this.svg.call(this.tip)

        // render chart with initial data
        this.renderChart(props.data)
    }

    renderChart = (chartData: ReadonlyArray<DataPoint>): void => {
        this.x.domain(chartData.map(function(d: DataPoint): string { return d.label }))
        this.y.domain([0, d3.max(chartData, function(d: DataPoint): number { return d.value })])

        this.xAxisContainer.call(this.xAxis)
        this.yAxisContainer.call(this.yAxis)

        // bars
        const bars = this.g.selectAll(".bar")
            .data(chartData)

        bars.enter()
                .append("rect")
                .attr("class", "bar")
                // .on("mouseover", d => this.tip.show(d))
                // .on("mouseout", this.tip.hide)
            .merge(bars)
                .attr("x", (d: DataPoint) => this.x(d.label) )
                .attr("y", (d: DataPoint) => this.y(d.value) )
                .attr("width", this.x.bandwidth())
                .attr("height", (d: DataPoint) => (
                    this.height - this.margin.top - this.margin.bottom) - this.y(d.value),
                )

        bars.exit().remove()
    }

    render(): JSX.Element {
        return (
            <div className="bar-chart" ref={(div) => { this.container = div }}/>
        )
    }
}

export default BarChart