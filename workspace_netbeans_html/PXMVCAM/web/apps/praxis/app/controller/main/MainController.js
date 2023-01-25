/**
 * @author: remicioluis
 */
var isDashboard = false;

var id_main = 'App-main';
var extLoaded = false;
var menuLoaded = false;
var MTYPE = '';
var meMain = '';
var hash = '';

Ext.define('Ext.Praxis.controller.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MainController',
    /**
     * Se ejecuta ni bien se instancia a la clase
     */
    init: function(view) {
        this.view = view;
        meMain = this;
        lg(this.view);
        //this.loadMenu();
    },
    /**
     * Se ejecuta luego de que se hayan renderizado todos los componentes de la vista
     */
    afterRender: function() {
        console.log('-----------  afterRender ----------');
        var URLactual = window.location;
        hash = URLactual.hash;
        console.log('isDashboard hash: '+hash);
        console.log('isDashboard: '+isDashboard);

        if (!isDashboard) {
            this.toggleView(false);
        } else {
            $('#menuCommands').show();
            this.active = true;
            this.ocultarContenedor();
        }

        var menuDashboard = '';
        menuDashboard += '<div id="panelDashImage">';
        menuDashboard += '<div id="imgLogout" class="menu-logout" style="background-size:contain"></div>';
        menuDashboard += '</div>';
        menuDashboard += '<div id="panelDashButtons" class="col-md-12"></div>';
        menuDashboard += '<div id="panelDashFooter">';
        menuDashboard += new Date().getFullYear() + ' &copy; Copyright Miami Technology Group,Inc. Rights reserved. v1.0';
        menuDashboard += '</div>';

        var nodeMenuDashboard = document.createElement('DIV');
        nodeMenuDashboard.id = 'panelDashboard';
        nodeMenuDashboard.innerHTML = menuDashboard;
        nodeMenuDashboard.style.display = 'none';

        var firstNode = document.getElementById(id_main + '-region-content-north');
        var parentNode = firstNode.parentNode;
        parentNode.insertBefore(nodeMenuDashboard, firstNode);

        var me = this;
        meMain = this;
        me.view.header.height = Ext.getCmp(id_main + '-region-content-north').getHeight();       

        $.ajax({
            url: CONTEXTPATH + '/getCustomerInfo',
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                var mtype = response.MTYPE;
                MTYPE = response.MTYPE;
                console.log(mtype);
                if (mtype !== 0) {
                    me.toggleView(false);
                    me.loadMenu();
                    return false;
                }

                var makeid = function() {
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                    for (var i = 0; i < 5; i++)
                        text += possible.charAt(Math.floor(Math.random() * possible.length));

                    return text;
                };

                $('#imgLogout').on('click', function(e) {
                    var url = CONTEXTPATH + '/logout';

                    var id = makeid();
                    url = url + '?id=' + id;
                    $.get(url, function(data) {
                        var result = data;

                        var redirect = CONTEXTPATH + '/';
                        //alert(url + ' - ' + redirect + ' - ' + PRAXIS + ' - ' + result + ' - ' + id);
                        if (result === '1') {
                            sessionStorage.clear();
                            window.location.href = redirect;
                            //window.location.assign(redirect);
                        }
                        ;
                    });
                });

                var dashMenus = [];

                $.ajax({
                    url: CONTEXTPATH + '/getMenu0',
                    type: 'POST',
                    data: {'MTYPE': MTYPE},
                    dataType: 'json',
                    error: function(err) {
                        lg(err);
                    },
                    success: function(response) {
                        console.log('Result getMenu0');

                        try {
                            isDashboard = true;
                            console.log('isDashboard_2 hash: '+hash);
                            if (isDashboard && hash.trim() === '') {
                                me.toggleView(true);
                            } else {
                                me.toggleView(false);
                            }
                            data = response;
                            var pdb = $('#panelDashButtons'), buttons = '';
                            $.each(data, function(x, y) {
                                if (y.MENU === '00' && y.TRANSA !== '00000') {
                                    dashMenus.push(y);

                                    buttons += '<div class="dashboardButton" data-nprog="'
                                            + y.NPROG
                                            + '" data-view="'
                                            + y.DESC2
                                            + '"><img src="resources/img/menu/dashboard/'
                                            + y.ICONO
                                            + '" width="100" height="100" /><br/><span>'
                                            + y.DESC1
                                            + '</span></div>';
                                }
                            });
//                            console.log(dashMenus);
                            pdb.html(buttons);
                            if (window.location.href.toString().indexOf('#') === -1) {
                                setTimeout(function() {
                                    $('#panelDashboard').fadeIn('slow');
                                }, 250);
                            } else {
                                me.loadMenu();
                            }

                            $('.dashboardButton').on('click', function(e) {
                                var menu = e.currentTarget;
                                console.log("Clic en menu");
                                console.log(menu);
                                var nprog = menu.getAttribute('data-nprog').trim();
                                console.log('set optionSelectDashboard');
                                optionSelectDashboard = { nprog: nprog };
                                console.log(optionSelectDashboard);
                                if (nprog !== 'PX00PRAXIS') {
                                    var view = menu.getAttribute('data-view').trim();

                                    if (view !== '' && view !== '#') {
                                        console.log(window.location.origin + window.location.pathname.replace('Home', '') + '#' + view);
                                        // Save data to sessionStorage
                                        sessionStorage.setItem('nprog', nprog);
                                        window.location.href = window.location.origin + window.location.pathname.replace('Home', '') + '#' + view;//+'?nprog='+nprog;
                                        me.loadMenu();
                                        isDashboard = false;
                                        me.toggleView(false);
                                    } else {
                                        global.Msg({
                                            msg: 'The option is not available',
                                            icon: 2,
                                            buttons: 1
                                        });
                                    }
                                } else {
                                    if (!extLoaded)
                                        //Ext.onReady(me.init, me);
                                        me.loadMenu();
                                    me.toggleView(false);
                                    me.ocultarContenedor();
                                    $('#menuCommands').removeClass('menuCommandRWD');
                                }
                            });
                        } catch (err) {
                            lg(err);                            
                        }
                    }
                });
                
            },
            error: function(err) {
                lg(err);                
            }
        });
        
        /**************************** BEGIN LOAD TABLES *************************************/
        $.ajax({
            url: CONTEXTPATH + '/getTables',
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                
            },
            error: function(err) {
                lg(err);                
            }
        });
        /**************************** END LOAD TABLES *************************************/
        
        
        
        
        setInterval(Ext.bind(this.validaSesion,this), 1860000); // 31min = 31*60*1000 = 1860000
    },
    
    validaSesion: function() {
        $.ajax({
            url: CONTEXTPATH + '/validaSesion',
            type: 'POST',
            data: {},
            dataType: 'json',
            error: function(err) {
                lg(err);
            },
            success: function(response) {
                try {
                    var success = response.success;
                    if(!success)
                    {
                        global.Msg({ msg: response.sesion });
                    }
                } catch (err) {
                    lg(err);                            
                }
            }
        });
    },
    
    menuContentExpand: function() {
        var panel = Ext.getCmp(id_main + '-region-content-north');
        var heightMenu = 400;
        panel.setHeight(heightMenu);
    },
    menuContentCollapse: function() {
        var panel = Ext.getCmp(id_main + '-region-content-north');
        panel.setHeight(105);
    },
    mostrarContenedor: function() {
        var me = this;
        me.menuContentCollapse();
        Ext.getCmp(id_main + '-region-content-west').hide();
        Ext.getCmp(id_main + '-content-background').hide();
        Ext.getCmp(id_main + '-contenedor').show();
    },
    ocultarContenedor: function() {
        var me = this;
        me.menuContentCollapse();
        var panel = Ext.getCmp(id_main + '-region-content-north');
        Ext.getCmp(id_main + '-region-content-west').show();
        Ext.getCmp(id_main + '-content-background').show();
        Ext.getCmp(id_main + '-contenedor').hide();
        Ext.getCmp(id_main + '-contenedor').removeAll();
        panel.setHeight(105);
    },
    mostrarDesktop: function() {
        var panel = Ext.getCmp(id_main + '-region-content-north');
        Ext.select('.menu-hide-element').setStyle({display: 'block'});
        panel.setHeight(105);
    },
    ocultarDesktop: function() {
        var panel = Ext.getCmp(id_main + '-region-content-north');
        Ext.select('.menu-hide-element').setStyle({display: 'none'});
        panel.setHeight(32);
    },
    toggleView: function(toggle) {
        if (toggle) {
            $('#' + id_main + '-region-content-north-body').css('visibility', 'hidden');
            $('#' + id_main + '-region-content-center-parent-body').css('visibility', 'hidden');
            $('#' + id_main + '-region-content-center-parent').css('zIndex', '-1');
            $('#panelDashboard').show();
        } else {
            $('#panelDashboard').hide();
            $('#' + id_main + '-region-content-north-body').css('visibility', 'visible');
            $('#' + id_main + '-region-content-center-parent-body').css('visibility', 'visible');
            $('#' + id_main + '-region-content-center-parent').css('z-index', '0');
            $('#' + id_main + '-region-content-center-parent').show();
        }
    },
    home: function() {
        if (isDashboard) {
            this.toggleView(true);
        } else {
            $('#menuCommands').show();
            this.active = true;
            this.ocultarContenedor();
        }
        window.location.href = window.location.origin + window.location.pathname.replace('Home', '') + '#';
    },
    loadMenu: function() {
        console.log(' ------- load Menu ------');
        if (menuLoaded)
            return;
        $('#menuPraxis').empty();
        $('#menuLateral').empty();
        var menuPadreTemplate = '<li><a href="#" data-panel="panel#ID">#DESC</a></li>';
        var panelTemplate = '<div id="panel#ID" class="panel-menu panel-hidden">#ID</div>';
        var panelFavorite = '<div id="panel#ID" class="panel-menu panel-hidden menu-parent">#ID</div>';
        var menuLateralTemplate = '<a class="btn-left-bar" nprog="#NPROG">#DESC</a>';

        var data, lista, htmlContent = '';
        var modulos = [], laterales = [], parents = [];
        var me = this;

        $.ajax({
            url: CONTEXTPATH + '/getMenu',
            type: 'POST',
            dataType: 'json',
            error: function(err) {
                lg(err);
            },
            success: function(response) {
                try {
                    data = response;
                    console.log('Begin MENU 00');
                    $.each(data, function(x, y) {
                        if (y.DESC1.trim() !== 'Table Maintenance') {
                            if (y.SMENU === '000' && y.MENU !== '00') {
                                parents.push(y);
                                modulos.push(y.MENU);
                            }

                            if (y.MENU === '00' && y.TRANSA !== '00000') {
                                laterales.push(y);
                            }
                        }
                    });
                    console.log('End MENU 00');
                    // Cargar menu lateral
                    var menuLateral = $('#menuLateral')[0];

                    $.each(laterales, function(a, b) {
                        //if(b.NPROG==='PX00000040')
                        //    menuLateral.innerHTML += menuLateralTemplate.replace('#NPROG', b.NPROG).replace('#DESC', 'View Ticket Normal');
                        //else 
                            menuLateral.innerHTML += menuLateralTemplate.replace('#NPROG', b.NPROG).replace('#DESC', b.DESC1);
                    });

                    var menuPraxis = $('#menuPraxis')[0];
                    var panelPraxis = $('#panelPraxis')[0];
                    panelPraxis.innerHTML = '';

                    $.each(parents, function(a, b) {
                        //if(b.NPROG==='PX00000040')
                        //    menuPraxis.innerHTML += menuPadreTemplate.replace('#ID', b.MENU).replace('#DESC','View Ticket Normal');
                        //else
                            menuPraxis.innerHTML += menuPadreTemplate.replace('#ID', b.MENU).replace('#DESC', b.DESC1);
                        if (b.MENU === '18') {
                            panelPraxis.innerHTML += panelFavorite.replace('#ID', b.MENU).replace('#ID', b.MENU);
                        } else {
                            panelPraxis.innerHTML += panelTemplate.replace('#ID', b.MENU).replace('#ID', b.MENU);
                        }

                    });

                    $('#menuPraxis a').on('click', function(e) {
                        $('.panel-parent').show();
                        $('#menuCommands').show();
                        $('#menuCommands').addClass('menuCommandRWD');
                        $('.panel-menu').hide();

                        var link = e.currentTarget;
                        var idPanel = $(link).data('panel');
                        var panel = $('#' + idPanel);
                        $('#menuPraxis a').removeClass('menuSelected');

                        $('.panel-menu').hide();
                        panel.show();

                        $(link).addClass('menuSelected');

                        me.menuContentExpand();
                    });

                    $('.close-menu').on('click', function(e) {
                        me.menuContentCollapse();
                        $('#menuCommands').removeClass('menuCommandRWD');
                        if (window.innerWidth < 1200 && !me.active)
                            $('#menuCommands').hide();
                    });

                    $('.menu-home').on('click', function(e) {
                        me.home();
                    });

                    $('.menu-desktop').on('click', function(e) {
                        var estado = $('.menu-hide-element')[0].style.display || 'block';

                        if (estado === 'block') {
                            me.ocultarDesktop();
                        } else {
                            me.mostrarDesktop();
                        }
                    });

                    $('.menu-logout').on('click', function(e) {
                        var url = CONTEXTPATH + '/logout';
                        var id = makeid();
                        url = url + '?id=' + id;
                        $.get(url, function(data) {
                            var result = data;

                            var redirect = CONTEXTPATH;
                            if (result === '1') {
                                sessionStorage.clear();
                                window.location.href = redirect;
                            }
                            ;
                        });
                    });

                    $('.btn-left-bar').on('click', function(e) {
                        var nprog = e.target.getAttribute('nprog');
                        var aLink;
                        if (nprog !== '') {
                            aLink = $('.menu-option li a[data-nprog=' + nprog + ']');
                            if (aLink.length > 0) {
                                aLink[0].click();
                            } else {
                                console.log('Program code not found.');
                            }
                        } else {
                            console.log('Program code empty.');
                        }
                    });

                    data = response;

                    var m, c = modulos.length;

                    console.log(c);
                    for (m = 0; m < c; m++) {
                        htmlContent = '';
                        lista = [];

                        var modulo = modulos[m];

                        $.each(data, function(i, item) {

                            if (item.MENU === modulo) {
                                lista.push(item);

                            }
                        });

                        printMenu(lista[0]);

                        $('#panel' + modulo.toString()).html(htmlContent);

                        $('#panel' + modulo + ' li').on('click', function(e) {
                            console.log("Entro2");
                            var ul = e.currentTarget.parentNode;
                            var $class = ul.className;
                            var classes = $class.split(' ');
                            var tipo = 'S';
                            $.each(classes, function(x, y) {
                                if (y === 'menu-column') {
                                    tipo = 'C';
                                }
                                ;

                                if (y === 'menu-open') {
                                    $(ul).removeClass('menu-open');
                                    $(ul).addClass('menu-closed');

                                    if (tipo === 'C') {
                                        $('ul>li', ul).slideUp('fast');
                                    } else {
                                        $('ul', ul).slideUp('fast');
                                    }
                                } else {
                                    if (y === 'menu-closed') {
                                        $(ul).removeClass('menu-closed');
                                        $(ul).addClass('menu-open');

                                        if (tipo === 'C') {
                                            $('ul>li', ul).slideDown('fast');
                                        } else {
                                            $('ul', ul).slideDown('fast');
                                        }
                                    }
                                }
                            });
                        });

                        $('#panel' + modulo + ' li a').on('click', function(e) {
                            console.log("Entro1");
                            var link = e.currentTarget;
                            var nprog = ($(link).data('nprog') || '');
                            var view = ($(link).data('view') || '');
                            var title = ($(link).data('title') || '');
                            var modulo = ($(link).data('modulo') || '').toUpperCase();
                            
                            optionSelect = {
                                nprog: nprog,
                                view: view,
                                title: title,
                                modulo: modulo
                            };
                            sessionStorage.setItem('nprog', nprog);
                            console.log(optionSelect);
                            if (modulo === 'CONCILIATION CONCILLIATION') {
                                modulo = 'CONCILIATION';
                            }
                            modulo = '<span style="font-size: 11pt; font-family: Arial; font-weight: bold;">' + modulo + '</span>';
                            var title_module = '<h2 class="label-praxis-module">PRAXIS</h2>';

                            if (nprog !== '') {
                                if (view !== '#' && view !== '') {
                                    title_module = '<h2 class="label-praxis-module">' + modulo + '<br>' + title + '</h2>';
                                    $('#divTitle').html(title_module);

                                    if (view === '') {
                                        alert('Under Construction');
                                        return;
                                    }
                                    ;

                                    var codeProg = nprog.substring(0, 2) + nprog.substring(7, 10);
                                    $('#menuProgram').html(codeProg);
                                } else {
                                    global.Msg({
                                        msg: 'Under Construction',
                                        icon: 2,
                                        buttons: 1
                                    });
                                }
                            }
                        });
                        $('#panel' + modulo + ' a').on('click', function(e) {
                            console.log("Entro");
                            var link = e.currentTarget;
                            var nprog = ($(link).data('nprog') || '');
                            var view = ($(link).data('view') || '');
                            var title = ($(link).data('title') || '');
                            var modulo = ($(link).data('modulo') || '').toUpperCase();
                            optionSelect = {
                                nprog: nprog,
                                view: view,
                                title: title,
                                modulo: modulo
                            };
                            sessionStorage.setItem('nprog', nprog);
                            console.log(optionSelect);
                            if (modulo === 'CONCILIATION CONCILLIATION') {
                                modulo = 'CONCILIATION';
                            }
                            modulo = '<span style="font-size: 11pt; font-family: Arial; font-weight: bold;">' + modulo + '</span>';
                            var title_module = '<h2 class="label-praxis-module">PRAXIS</h2>';

                            if (nprog !== '') {
                                if (view !== '#' && view !== '') {
                                    title_module = '<h2 class="label-praxis-module">' + modulo + '<br>' + title + '</h2>';
                                    $('#divTitle').html(title_module);

                                    if (view === '') {
                                        alert('Under Construction');
                                        return;
                                    }
                                    ;

                                    var codeProg = nprog.substring(0, 2) + nprog.substring(7, 10);
                                    $('#menuProgram').html(codeProg);
                                } else {
                                    global.Msg({
                                        msg: 'Under Construction',
                                        icon: 2,
                                        buttons: 1
                                    });
                                }
                            }
                        });
                    
                    
                    }
                    ;
                } catch (err) {
                    lg(err);
                }

                var user = '';

                $.ajax({
                    url: CONTEXTPATH + '/getUser',
                    type: 'POST',
                    dataType: 'json',
                    success: function(data) {
                        // console.log(data);
                        user = data.user.USR.trim();//;
                        $('#menuUser').html(user);
                        gloUsr = user;
                    },
                    error: function(err) {
                        // console.log(err);
                    },
                    complete: function() {
                        var nprog = 'PX000';
                        var dateTime = new Date();

                        var date = dateTime.getFullYear() + "/" + ("0" + (dateTime.getMonth() + 1)).slice(-2) + "/" + ("0" + dateTime.getDate()).slice(-2);
                        var time = ("0" + dateTime.getHours()).slice(-2) + ":" + ("0" + dateTime.getMinutes()).slice(-2);

                        $('#menuProgram').html(nprog);
                        $('#menuDate').html(date);
                        $('#menuHour').html(time);
                    }
                });

                menuLoaded = true;
            }
        });

        var getTipoMenu = function(item) {
            var menu, smenu, transa, tipo, nprog;
            menu = parseInt(item.MENU);
            smenu = parseInt(item.SMENU);
            transa = parseInt(item.TRANSA);
            nprog = item.NPROG;

            // Tipos : (P)rincipal , (C)olumna, (S)ubmenu, (M)enu

            if (smenu === 0) { //(P)rincipal
                tipo = 'P';
            } else {
                if (smenu % 100 === 0 && transa === 0) { // (C)olumna
                    tipo = 'C';
                } else {
                    if (transa === 0 && nprog === '') {
                        tipo = 'S';
                    } else {
                        tipo = 'O';
                    }
                }
            }

            return tipo;
        };

        var printMenu = function(item) {

            var tipo = getTipoMenu(item);
            var array = getChildMenus(item, tipo);
            var d, c = array.length, clase = '', nprog = '', view = '', title = '', modulo = '';
            if (item.MENU === '18') {
//                console.log(item);
//                console.log(tipo);
//                console.log(c);
            }

            switch (tipo) {
                case 'P':
                   
                     if (item.MENU === '18') {
                       clase = 'menu-parentFavorite';
                    } else {
                        clase = 'menu-parent';
                    }
                    break;
                case 'C':
                    if (item.MENU === '18') {
                        clase = '';
                    } else {
                        clase = 'menu-column menu-open';
                    }
                    break;
                case 'S':
                    clase = 'menu-submenu menu-closed';
                    break;
                case 'O':
                    {
                        clase = 'menu-option';
                        view = ' data-view="' + item.DESC2 + '"';
                        nprog = ' data-nprog="' + item.NPROG + '"';
                        title = ' data-title="' + item.DESC1 + '"';
                        //title = ' data-title="' + (item.NPROG==='PX00000040'? 'View Ticket Normal':item.DESC1) + '"';
                        modulo = ' data-modulo="' + item.MODULO + ' ' + item.MENU1.toUpperCase().replace(item.MODULO, '') + '"';
                    }
                    break;
            }


            if (c + 1 > 0) {
                if (item.MENU === '18') {
                    htmlContent += '<div class="' + clase + '">';
                } else {
                    htmlContent += '<ul class="' + clase + '">';
                }
            }

            //htmlContent += '<a>' + item.MENU + '-' + item.SMENU + '-' + item.TRANSA + '-' + item.DESC1 + '-' + item.NPROG + '-' + tipo + '</a>';

            if (tipo !== 'P') {
                // console.log( String(item.MODULO).replace(' ', '').toLowerCase() );

                var xmod = String(item.MODULO).replace(' ', '').toLowerCase();
                var href = String(item.DESC2).toLowerCase();
                if (href === '#')
                    href = '';

                if (item.MENU === '18') {


//                      buttons += '<div class="dashboardButton" data-nprog="'
//                                            + y.NPROG
//                                            + '" data-view="'
//                                            + y.DESC2
//                                            + '"><img src="resources/img/menu/dashboard/'
//                                            + y.ICONO
//                                            + '" width="100" height="100" /><br/><span>'
//                                            + y.DESC1
//                                            + '</span></div>';

                    htmlContent += '<div class="favoriteButton"> <img src="resources/img/botones/estrellaFav.png" ><br/><span>    <a href="#' + href + '"' + view + nprog + title + modulo + '>' + item.DESC1 + '</a></span></div>';
                    
                  
                } else {
                    htmlContent += '<li><a href="#' + href + '"' + view + nprog + title + modulo + '>' + item.DESC1 + '</a></li>';
                }
            }

            for (d = 0; d < c; d++) {
                printMenu(array[d]);
            }
            ;

            if (c + 1 > 0) {
                if (item.MENU === '18') {
                    htmlContent += '</div>';
                } else {
                    htmlContent += '</ul>';
                }
            }
        };

        var getChildMenus = function(item, tipo) {
            var childNodes = [];
            $.each(lista, function(i, x) {
                var smenu, transa;
                switch (tipo) {
                    case 'P':
                        {
                            smenu = parseInt(x.SMENU);
                            transa = parseInt(x.TRANSA);

                            if (smenu % 100 === 0 && smenu > 0 && transa === 0) {
                                childNodes.push(x);
                            }
                            ;
                        }
                        break;

                    case 'C':
                        {
                            var smenuPadre = parseInt(item.SMENU);
                            smenu = parseInt(x.SMENU);
                            transa = parseInt(x.TRANSA);
                            if (smenu - smenuPadre < 100 && smenu - smenuPadre > 0 && transa === 0 && smenu % 10 === 0) {
                                childNodes.push(x);
                            }
                            else {
                                if (smenu === smenuPadre && transa > 0) {
                                    childNodes.push(x);
                                }
                            }
                            /*
                             if(item.DESC1 === 'MASTER TABLE' && x.DESC1 === 'Refund Process Control'){
                             lg(x);
                             }*/
                        }
                        break;

                    case 'S':
                        {
                            var smenuPadre = parseInt(item.SMENU);
                            smenu = parseInt(x.SMENU);
                            transa = parseInt(x.TRANSA);
                            if (smenu === smenuPadre && transa > 0) {
                                childNodes.push(x);
                            } else {

                                if (smenu - smenuPadre % 10 === 0 && smenu - smenuPadre > 0 && transa === 0) {
                                    childNodes.push(x);
                                } else {
                                    if (smenu - smenuPadre > 0 && smenu - smenuPadre <= 9 && smenu - smenuPadre > 0 && transa === 0 && smenuPadre % 10 === 0) {
                                        childNodes.push(x);
                                    }
                                }
                            }
                            ;
                        }
                        break;

                    case 'O':
                        break;

                }

            });

            return childNodes;
        };

        var makeid = function()
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        };


        var getParentMenus = function() {
            var parents = [];
            $.each(data, function(x, y) {
                if (y.SMENU === '000') {
                    parents.push(y);
                }
            });
            return parents;
        };

        $('.close-menu').on('click', function(e) {
            me.menuContentCollapse();
        });

        $('.menu-desktop').on('click', function(e) {
            var boton = e.currentTarget;
            var estado = boton.getAttribute('status') || 'visible';

            if (estado === 'visible') {
                boton.setAttribute('status', 'hidden');
                me.mostrarDesktop();
            } else {
                boton.setAttribute('status', 'visible');
                me.ocultarDesktop();
            }
            ;
        });

        $('.menu-home').on('click', function(e) {
            me.home();
        });

        $('.menu-logout').on('click', function(e) {
            var url = CONTEXTPATH + '/logout';
            $.get(url, function(data) {
                var result = data;

                var redirect = CONTEXTPATH;

                if (result === '1') {
                    //window.location = redirect;
                    sessionStorage.clear();
                    window.location.href = redirect;
                }
                ;
            });
        });

        extLoaded = true;
    }

});