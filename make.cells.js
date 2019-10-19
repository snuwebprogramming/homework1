const x = 9;
const y = 9;

const cells = [];

for(let i = 0; i < x; i++) {
    const cellsX = [];
    cells.push(cellsX);
    
    for(let j=0; j < y; j++) {
        const domElement = document.createElement('div');
        map.appendChild(domElement);

        domElement.setAttribute('x', i);
        domElement.setAttribute('y', j);
        domElement.setAttribute('isMine', true);
        domElement.setAttribute('isOpen', false);
        domElement.setAttribute('isFlagged', false);
        cellsX[j] = domElement;

        const openCell = function(cell) {
            const x = cell.getAttribute('x');
            const y = cell.getAttribute('y');
            const isMine = cell.getAttribute('isMine');
            const isOpen = cell.getAttribute('isOpen');
            const isFlagged = cell.getAttribute('isFlagged');
            if(isOpen) return;
            if(isFlagged) return;

            if(isMine) {
                gameOver();
            } else {
                const neighborCells = getNeighborCells(x, y);
                const mineCount = neighborCells.reduce((pv, cv) => {
                    if(cv.getAttribute('isMine')) pv++;
                    return pv;
                } , 0);

                if(mineCount > 0) {
                    cell.textContent = mineCount;
                    cell.getAttribute('isOpen') = true;
                } else { // mine is zero
                    neighborCells.forEach(neighborCell => openCell(neighborCell));
                }
            }
        };

        domElement.addEventListner('click', function(e) {
            e.preventDefault();
            openCell(this);
        });
        
        
    }
}
