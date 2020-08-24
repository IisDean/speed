function spreenavAdd() {

    document.writeln(
        '<style> ' +

        '</style> ' +
        '<div class="spreenav" > ' +
        '</div>'
    );

    var nav = document.getElementById('nav'),
        navClass = nav.className,
        navtop = getElementTop(nav);
    window.onscroll = function() {
        var wt = document.body.scrollTop || document.documentElement.scrollTop;

        if (wt >= navtop) {
            nav.className = navClass + ' spreenav-add'
        } else {
            nav.className = navClass
        }
    };

    function getElementTop(elem) {
        var elemTop = elem.offsetTop;
        return elemTop
    }

    var n = document.getElementsByTagName("body")[0].getAttribute('data-nav');
    var itemClass = nav.getElementsByClassName('nav_item')[n].className
    nav.getElementsByClassName('nav_item')[n].className = itemClass + " active"
}
spreenavAdd();