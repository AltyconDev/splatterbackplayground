import { TWO_PI } from "../constants.js";
import { scale } from "../utilities.js";


class cGraph{
    constructor(canvas,options,data){
        this.canvas = canvas;
        this.options = options;
        this.data = data;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext('2d');
        this.color = 'white';
        this.spacing = 16;
        this.radiansPerDegree = Math.PI / 180;
        this.center = {
            x: this.width * 0.5,
            y: this.height * 0.5
        }
        this.xAxisLine = {
            startX: this.spacing * 3,
            startY: this.height - (this.spacing * 3),
            endX: this.width,
            endY: this.height - (this.spacing * 3)
        };
        this.yAxisLine = {
            startX: this.spacing * 3,
            startY: this.height - (this.spacing * 3),
            endX: this.spacing * 3,
            endY: this.spacing
        };
        this.axisTitles = [];
        this.xAxisUnitLines = [];
        this.yAxisUnitLines = [];
        
        
        // initialize x and y axis unit lines
        
    }
    setAxisTitles(xAxisTitle, yAxisTitle){
        if(!xAxisTitle){
            console.warn(`"setAxisTitles must atleast include one title for x axis"`);
            return;
        }
        this.axisTitles.push(xAxisTitle);
        if(yAxisTitle) this.axisTitles.push(yAxisTitle);
    }
    drawAxis(){
        this.context.strokeStyle = this.color;

        this.context.beginPath();
        this.context.moveTo(this.xAxisLine.startX, this.xAxisLine.startY);
        this.context.lineTo(this.xAxisLine.endX, this.xAxisLine.endY);
        this.context.stroke();

        this.context.beginPath();
        this.context.moveTo(this.yAxisLine.startX, this.yAxisLine.startY);
        this.context.lineTo(this.yAxisLine.endX, this.yAxisLine.endY);
        this.context.stroke();
    }
    drawAxisTitles(){
        if(this.axisTitles.length === 0){
            console.warn('Must set axisTitles before rendering');
            return;
        }
        const yAxisRotatingDegrees = this.radiansPerDegree * -90;

        // y axis
        if(this.axisTitles[1]){
            this.context.save();
            this.context.fillStyle = this.color;
            this.context.font = '16px sans-serif';
            this.context.textBaseline = 'middle';
            this.context.translate(this.spacing, this.center.y);
            this.context.rotate(yAxisRotatingDegrees);
            this.context.fillText(this.axisTitles[1], 0, 0);
            this.context.restore();
        }
        
        // x axis
        this.context.fillStyle = this.color;
        this.context.font = '16px sans-serif';
        this.context.textBaseline = 'middle';
        this.context.fillText(this.axisTitles[0], this.center.x, this.height - this.spacing);
    }
    drawAxisUnitLines(){

        // this.xAxisUnitLines.forEach( line => {
        //     this.context.beginPath();
        //     this.context.moveTo(line.startX, line.startY);
        //     this.context.lineTo(line.endX, line.endY);
        //     this.context.stroke();
        // });
        // this.yAxisUnitLines.forEach( line => {
        //     this.context.beginPath();
        //     this.context.moveTo(line.startX, line.startY);
        //     this.context.lineTo(line.endX, line.endY);
        //     this.context.stroke();
        // });
    }
    drawAxisUnitNumbers(){

        this.context.fillStyle = this.color;
        this.context.font = '8px serif';
        
        this.xAxisUnitLines.forEach( (line,index) => {

            const textX = index > 9 ? line.endX - 4 : line.endX - 2;
            const textY = line.endY + 4;

            this.context.textBaseline = 'top';
            this.context.fillText(`${index}`, textX, textY);
        });
        this.yAxisUnitLines.forEach( (line,index) => {
            
            const textX = index > 9 ? line.endX - 12: line.endX - 10;
            const textY = line.endY;

            this.context.textBaseline = 'middle';
            this.context.fillText(`${index}`, textX, textY);
        });
    }
    drawAxisData(){
        this.data.forEach( (datum,index) => {
            
            this.context.beginPath();
            this.context.arc(x,y, 4, 0, TWO_PI);
        })
    }
    render(){

        this.drawAxis();
        this.drawAxisUnitLines();
        this.drawAxisUnitNumbers();
        this.drawAxisTitles();
    }
}

export { cGraph };