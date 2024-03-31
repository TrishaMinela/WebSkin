document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll('.item');
    const instruction = document.getElementById('instruction');
    const vanity = document.getElementById('Vanity');
    let activeItem = null;
    let arrangedItems = []; // To store the order of arranged items

    items.forEach(item => {
        item.addEventListener('mousedown', startDrag);
        item.addEventListener('mouseup', endDrag);
    });

    function startDrag(e) {
        activeItem = this;
        offsetX = e.clientX - activeItem.getBoundingClientRect().left;
        offsetY = e.clientY - activeItem.getBoundingClientRect().top; 
        document.addEventListener('mousemove', dragItem);
    }
    
    function dragItem(e) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            activeItem.style.left = x + 'px';
            activeItem.style.top = y + 'px';
    }

    function endDrag() {
        activeItem = null;
        document.removeEventListener('mousemove', dragItem);
        this.removeEventListener('mouseup', endDrag); 
        this.style.pointerEvents = 'none'; 
        checkArrangement();
    }


    // Function to get a random position within the viewport
    function getRandomPosition() {
        const x = Math.random() * (window.innerWidth - 150); // Subtract item width
        const y = Math.random() * (window.innerHeight - 150); // Subtract item height
        return { x, y };
    }

    // Set initial random positions for each skincare item
    items.forEach(item => {
        const position = getRandomPosition();
        item.style.left = position.x + 'px';
        item.style.top = position.y + 'px';
    });

    
    // Function to check if the items are arranged correctly
    function checkArrangement() {
        arrangedItems = Array.from(items)
            .filter(item => parseInt(item.style.left) > 0)
            .sort((a, b) => parseInt(a.style.left) - parseInt(b.style.left))
            .map(item => item.id);




        const correctOrder = ['Cleanser', 'Toner', 'Serum', 'Moisturizer', 'Sunscreen'];
        for (let i = 0; i < correctOrder.length; i++) {
            if (arrangedItems[i] !== correctOrder[i]) {
                return false;
            }
        }
        document.getElementById('instruction').innerHTML = "<h1>You're ready for the morning!</h1>"; 
        vanity.innerHTML = '<img src="assets/Sink.jpg.png" alt="Sink">';
        displayWaterDroplets(); // If items are arranged correctly, display water droplets
        return true;
    }

    
    //Test
    //displayWaterDroplets();
    
    // Function to display water droplets
    function displayWaterDroplets() {
        const waterDroplets = document.getElementById('waterDroplets');
        waterDroplets.innerHTML = ''; // Clear existing droplets
        for (let i = 0; i < 1000; i++) {
            const droplet = document.createElement('div');
            droplet.classList.add('droplet');
            //Random Size
            droplet.style.width = Math.random() * 10 + 'px'; 
            droplet.style.height = Math.random() * 15 + 'px';
            //Random position
            droplet.style.left = Math.random() * window.innerWidth + 'px';
            droplet.style.top = Math.random() * window.innerHeight + 100 + 'px';
            waterDroplets.appendChild(droplet);
        }
    }

});
    

