addButtonsToDivs();
function addButtonsToDivs() {
    var divs = document.querySelectorAll('body .update-v2-social-activity');
    divs.forEach(function (div) {
        if (div.getElementsByClassName('button-set').length === 0) {
            var buttonSet = document.createElement('div');
            buttonSet.style.display = 'block';
            buttonSet.style.padding = '10px';
            buttonSet.style.alignItems = 'center';
            buttonSet.style.display = 'flex';
            buttonSet.style.justifyContent = 'center';

            for (var i = 1; i <= 5; i++) {
                var button = document.createElement('button');
                button.textContent = i;
                button.style.marginRight = '50px';
                button.style.fontSize = '15px';
                button.addEventListener('click', function (event) {
                    var parentContainer = this.closest('.update-v2-social-activity');
                    if (parentContainer) {
                        var sibling = parentContainer.parentNode.querySelector('.feed-shared-update-v2__description-wrapper.mr2');
                        if (sibling) {
                            var textParent = sibling.querySelector('span[dir="ltr"]');
                            if (textParent) {
                                var text = textParent.textContent;
                                var buttonNumber = event.target.textContent; // Retrieve the button number
                                console.log('Text:', text, 'Button Number:', buttonNumber);
                                // var iframe = iframe_div.getElementById('iframe')
                                //   iframe.contentWindow.postMessage({ text: text, buttonNumber: buttonNumber }, '*');
                                chrome.runtime.sendMessage({command: "post", data:{text,buttonNumber}}, (response) => {
                                    console.log("data added");
                                    console.log(response);
                                  });

                            } else {
                                console.log('Could not find textParent element inside the grandparent container.');
                            }
                        } else {
                            console.log('Could not find sibling container of the button.');
                        }
                    } else {
                        console.log('Could not find parent container of the button.');
                    }
                });
                buttonSet.appendChild(button);
            }
            buttonSet.classList.add('button-set');

            div.appendChild(buttonSet);
        }
    });
}

// Call the function every 5 seconds
setInterval(addButtonsToDivs, 5000);
