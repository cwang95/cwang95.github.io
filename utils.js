const utils = {
    
    // https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
    getMousePos(evt, canvas, ctx) {
        const clientRect = canvas.getBoundingClientRect();
        const p = ctx
                    .getTransform()
                    .inverse()
                    .transformPoint(
                        new DOMPoint(
                            (evt.clientX - clientRect.left) / clientRect.width * parseInt(canvas.width),
                            (evt.clientY - clientRect.top) / clientRect.height * parseInt(canvas.height)
                        )
                    );

        return {
            x: Math.floor(p.x),   // scale mouse coordinates after they have
            y: Math.floor(p.y)     // been adjusted to be relative to element
        }
    },
    getBoundingBox(x, y, w, h) {
        return { x, y, width: w, height: h }
    },
    intersects(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width && 
               rect1.x + rect1.width > rect2.x && 
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    },
    roundNearest(value, nearest) {
        Math.round(value / nearest) * nearest
    },
    asGridCoord(x,y) {
        // use comma for safe negative nums
        return `${x},${y}`
    },
    emitEvent(name, detail) {
        // walking finished, trigger custom events
        const event = new CustomEvent(name, { detail });
        document.dispatchEvent(event);
    }
}