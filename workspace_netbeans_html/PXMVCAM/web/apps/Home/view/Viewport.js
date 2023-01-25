/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - RAVN                                     *
 * Document   : Viewport                                          *
 * Created on : 18-10-2016, 16:39:29                              *
 * Author     : Ronald Mayta (rmayta)                             *
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 18-10-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

/* global Ext, isDashboard, gloContextPath */

Ext.define('PXMVCAMHome.view.Viewport', {
    extend: 'Ext.Viewport',
    margin:0,
    padding:0,
    hidden: false,
    border: false,
    defaults:{
        border: false,
        style:{
            margin: '0px',
            padding:'0px'
        }
    },
    layout: 'border',
    requires: [
        'PXMVCAMHome.view.accounting.ATLMonthExtract.ATLMonthExtractForm',
        'PXMVCAMHome.view.sales.ConciliationASR.ConciliationASRForm'
    ],
    active: true,
    header:{
        width: 0,
        height: 0
    },
    initComponent: function() {
        console.log('2) APPLICATION ATL_MONTH_EXTRACT - VIEW VIEWPORT - INIT_COMPONENT');
        var me = this;
        
        var title_initial = '<div id="divTitle"><h2 class="label-praxis-module">PRAXIS</h2></div>';
        var title_module = '<div id="divTitle"><h2 class="label-praxis-module">MENU MODULE<br>Option</h2></div>';
        var html_header = '<div class="page-top-bar menu-hide-element">' + 
                        '<div class="page-am-logo"><img src="resources/img/menu/139X.png" height="47" /></div>'+
                        title_initial+
                        '<div class="page-am-iata"><img src="resources/img/menu/IATA_SP.png" /></div>'+
                        '<div class="page-am-miatech"><img src="resources/img/menu/logo_miatech3.png" /></div>'+
                    '</div>'+
                    '<div class="page-menu-bar">'+
                        '<ul id="menuPraxis">'+   
                        '</ul>'+
                        '<div id="menuCommands">'+
                          '<div class="menuCommandPanel">'+
                            '<div class="menuCommand">'+
                                '<span id="menuUser"></span>'+
                                '<span id="menuDate"></span>'+
                            '</div>'+
                            '<div class="menuCommand">'+
                                '<span id="menuProgram"></span>'+
                                '<span id="menuHour"></span>'+
                            '</div>'+
                            '<div class="menuCommand">'+
                                '<div class="menu menu-desktop"></div>'+
                                '<div class="menu menu-home"></div>'+
                                '<div class="menu menu-logout"></div>'+
                            '</div>'+
                          '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div id="menu" class="panel-parent">'+
                        '<div id="panelPraxis" class="panel-menus">'+
                        '</div>'+
                        '<div class="panel-slider" style="background:transparent">'+
                            '<span class="close-menu"></span>'+
                        '</div>'+
                    '</div>';
                    
        var htmlMenuLeft = '<div class="page-left-bar" id="left-bar">'+
            '<table height="100%" width="100%">'+
                '<tr>'+
                    '<td valign="center" id="menuLateral"></td>'+
                '</tr>'+
            '</table>'+
        '</div>';

        var htmlFondo = '<div class="fondo_principal"></div>';
        
        var menuDashboard = '<div id="panelDashboard">' +
            '<div id="panelDashImage">' +
            '    <div id="imgLogout" class="menu-logout" style="background-size:contain"></div>' +
            '</div>' +
            '<div id="panelDashButtons" class="col-md-12"></div>' +
            '<div id="panelDashFooter">' +
            '    <script>document.write(new Date().getFullYear());</script> &copy; Copyright Miami Technology Group,Inc. Rights reserved. v1.0' +
            '</div>' +
        '</div>';
        
        Ext.apply(me, {
            items:[
                {
                    region: 'north',
                    id: 'PXMVCAMHome-region-content-north',
                    height: 105,
                    border:false,
                    bodyStyle: 'visibility: hidden',
                    html: html_header
                },
                {
                    region:'center',
                    layout:'border',
                    id: 'PXMVCAMHome-region-content-center-parent',
                    border:false,
                    bodyStyle: 'visibility: hidden',
                    items:[
                        {
                            region:'west',
                            id: 'PXMVCAMHome-region-content-west',
                            width: 220,
                            border: false,
                            html: htmlMenuLeft
                        },
                        {
                            region: 'center',
                            id: 'PXMVCAMHome-region-content-center',
                            autoScroll: false,
                            layout: 'fit',
                            defaults:{
                                border: false
                            },
                            items:[
                                {
                                    xtype: 'panel',
                                    id: 'PXMVCAMHome-content-background',
                                    html: htmlFondo
                                },
                                {
                                    xtype: 'panel',
                                    id: 'PXMVCAMHome-contenedor',
                                    margin:0,
                                    padding:0,
                                    width: '100%',
                                    height: '100%',
                                    border: false,
                                    layout: 'fit',
//                                    hidden: true,
                                    hideMode:'offsets'
                                },
                                {
                                    xtype:'panel',
                                    id:'index_web_carga',
                                    hidden:true,
                                    hideMode:'offsets'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: 'PXMVCAMHome-content-dashboard',
                    html: menuDashboard,
                    bodyStyle: 'background:transparent;border:none;',
                    width:'100%',
                    border:0,
                    hidden: true
                }
            ],
            listeners:{
                afterrender: function(obj){
                    var me = this;
                    me.header.height = Ext.getCmp('PXMVCAMHome-region-content-north').getHeight();
                    me.loadMenu();
                    me.getCustomerInfo();
                    extLoaded = true;
                }
            }
        });
        me.callParent(arguments);
    },
    home: function(){
        var me = this;
        if(isDashboard){
            me.toggleView(true);
        }else{
            $('#menuCommands').show();
            active = true;
            me.ocultarContenedor();
        }
    },
    menuContentExpand: function(){
        var panel = Ext.getCmp('PXMVCAMHome-region-content-north');
        var heightMenu = 295;
        panel.setHeight( this.header.height + heightMenu );
    },
    menuContentCollapse: function(){
        var panel = Ext.getCmp('PXMVCAMHome-region-content-north');
        panel.setHeight( this.header.height );
    },
    mostrarContenedor: function(){
        var me = this;
        me.menuContentCollapse();
        Ext.getCmp('PXMVCAMHome-region-content-west').hide();
        Ext.getCmp('PXMVCAMHome-content-background').hide();
        Ext.getCmp('PXMVCAMHome-contenedor').show();
    },
    ocultarContenedor: function(){
        var me = this;
        me.menuContentCollapse();
        var panel = Ext.getCmp('PXMVCAMHome-region-content-north');
        Ext.getCmp('PXMVCAMHome-region-content-west').show();
        Ext.getCmp('PXMVCAMHome-content-background').show();
        Ext.getCmp('PXMVCAMHome-contenedor').hide();
        Ext.getCmp('PXMVCAMHome-contenedor').removeAll();
        panel.setHeight( this.header.height );
    },
    mostrarDesktop: function(){
        var panel = Ext.getCmp('PXMVCAMHome-region-content-north');
        Ext.select('.menu-hide-element').setStyle({display: 'none'});
        panel.setHeight( 32 );
    },
    ocultarDesktop: function(){
        var panel = Ext.getCmp('PXMVCAMHome-region-content-north');
        Ext.select('.menu-hide-element').setStyle({display: 'block'});
        panel.setHeight( this.header.height );
    },
    winFileLoad: function(){
        var panel = Ext.create('Ext.form.Panel',{
            id: 'PXMVCAMHome-form-file',
            defaults:{
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults:{
                        style: 'margin: 2px'
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            name: 'campo01',
                            id: 'campo01',
                            fieldLabel: 'Campo01',
                            value: 'campo01',
                            flex: 1
                        },
                        {
                            xtype: 'textfield',
                            name: 'campo02',
                            id: 'campo02',
                            fieldLabel: 'Campo02',
                            value: 'campo02',
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults:{
                        style: 'margin: 2px',
                        border: false
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            name: 'campo03',
                            id: 'campo03',
                            fieldLabel: 'Campo03',
                            value: 'campo03',
                            flex: 1
                        },
                        {
                            xtype: 'textfield',
                            name: 'campo04',
                            id: 'campo04',
                            fieldLabel: 'Campo04',
                            value: 'campo04',
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults:{
                        style: 'margin: 2px',
                        border: false
                    },
                    items:[
                        {
                            xtype: 'filefield',
                            name: 'file',
                            id: 'file',
                            fieldLabel: 'File',
                            msgTarget: 'side',
                            allowBlank: false,
                            flex: 1,
                            buttonText: 'Select file...'
                        }
                    ]
                }
            ]
        });
        Ext.create('Ext.window.Window', {
            title: 'Upload File',
            height: 150,
            width: 400,
            layout: 'fit',
            items: panel,
            buttonAlign: 'center',
            buttons:[
                {
                    text: 'Submit',
                    listeners:{
                        click: function(obj, e){
                            var form = Ext.getCmp('PXMVCAMHome-form-file').getForm();
                            if(form.isValid()){
                                var campo01 = Ext.getCmp('campo01').getValue();
                                var campo02 = Ext.getCmp('campo02').getValue();
                                var campo03 = Ext.getCmp('campo03').getValue();
                                var campo04 = Ext.getCmp('campo04').getValue();
                                form.submit({
                                    url: '<%=request.getContextPath()%>/CityMasterFile/upload_file',
                                    waitMsg: 'Uploading your photo...',
                                    params:{
                                        campo01: campo01,
                                        campo02: campo02,
                                        campo03: campo03,
                                        campo04: campo04
                                    },
                                    success: function(fp, o) {
                                        Ext.Msg.alert('Success', 'Your photo "' + o.result.file + '" has been uploaded.');
                                    }
                                });
                            }
                        }
                    }
                }
            ]
        }).show();
    },
    loadMenu:function(){
        var menuPadreTemplate = '<li><a href="#" data-panel="panel#ID">#DESC</a></li>';
        var panelTemplate ='<div id="panel#ID" class="panel-menu panel-hidden">#ID</div>';
        var menuLateralTemplate = '<a class="btn-left-bar" nprog="#NPROG">#DESC</a>';

        var data, lista, htmlContent = '';
        var modulos = [], laterales = [], parents = [];
        var me = this;
        $.ajax({
            url : gloContextPath + '/getMenu',
            type: 'POST',
            dataType: 'json',
            error : function(err){
                lg(err);
            },
            success : function(response){
              try{
                data = response;

                $.each(data, function (x, y) {
                    if(y.DESC1.trim() !== 'Table Maintenance'){
                        if (y.SMENU === '000' && y.MENU !== '00') {
                            parents.push(y);
                            modulos.push(y.MENU);
                        }

                        if(y.MENU === '00' && y.TRANSA !== '00000'){
                            laterales.push(y);
                        }
                    }
                });

                // Cargar menu lateral
                var menuLateral = $('#menuLateral')[0];

                $.each(laterales, function(a,b){
                    menuLateral.innerHTML += menuLateralTemplate.replace('#NPROG', b.NPROG).replace('#DESC', b.DESC1);
                });

                var menuPraxis = $('#menuPraxis')[0];
                var panelPraxis = $('#panelPraxis')[0];
                panelPraxis.innerHTML = '';

                $.each(parents, function(a,b){
                    menuPraxis.innerHTML += menuPadreTemplate.replace('#ID', b.MENU).replace('#DESC', b.DESC1);
                    panelPraxis.innerHTML += panelTemplate.replace('#ID', b.MENU).replace('#ID', b.MENU);
                });

                $('#menuPraxis a').on('click', function(e){
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

                $('.close-menu').on('click', function(e){
                    //alert(me.active);
                    me.menuContentCollapse();
                    $('#menuCommands').removeClass('menuCommandRWD');
                    if(window.innerWidth < 1200 && !me.active) $('#menuCommands').hide();
                });

                $('.menu-home').on('click', function(e){
                    me.home();
                });

                $('.menu-desktop').on('click', function(e){
                    var estado = $('.menu-hide-element')[0].style.display || 'block';

                    if(estado === 'block'){
                        //boton.setAttribute('status', 'hidden');
                        me.ocultarDesktop();
                    }else{
                        //boton.setAttribute('status', 'visible');
                        me.mostrarDesktop();
                    };
                });

                $('.menu-logout').on('click', function(e){
                    var url = gloContextPath + '/logout';
                    var id = makeid();
                    url = url+'?id='+id;
                    $.get(url, function(data){
                        var result = data;

                        var redirect = gloContextPath;
                        //alert(url + ' - ' + redirect + ' - ' + PRAXIS + ' - ' + result + ' - ' + id);
                        if(result === '1'){
                            window.location.href = redirect;
                            //window.location.assign(redirect);
                        };
                    });
                });

                $('.btn-left-bar').on('click', function(e){
                    var nprog = e.target.getAttribute('nprog');
                    var aLink;
                    if(nprog !== ''){
                        aLink = $('.menu-option li a[data-nprog=' + nprog + ']');
                        if(aLink.length > 0){
                            aLink[0].click();
                        }else{
                            console.log('Program code not found.');
                        }
                    }else{
                        console.log('Program code empty.');
                    }
                });

                data = response;

                var m, c = modulos.length;

                for (m = 0; m < c; m++) {
                    htmlContent = '';
                    lista = [];

                    var modulo = modulos[m];

                    $.each(data, function (i, item) {
                        if (item.MENU === modulo) lista.push(item);
                    });

                    printMenu(lista[0]);

                    $('#panel' + modulo.toString()).html(htmlContent);

                    $('#panel' + modulo + ' li').on('click', function (e) {
                        var ul = e.currentTarget.parentNode;
                        var $class = ul.className;
                        var classes = $class.split(' ');
                        var tipo = 'S';

                        $.each(classes, function (x, y) {
                            if (y === 'menu-column') {
                                tipo = 'C';
                            };

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

                    $('#panel' + modulo + ' li a').on('click', function(e){
                        var link = e.currentTarget;
                        var nprog = ($(link).data('nprog') || '');
                        var view = ($(link).data('view') || '');
                        var title = ($(link).data('title') || '');
                        var modulo = ($(link).data('modulo') || '').toUpperCase();
                        modulo = '<span style="font-size: 11pt; font-family: Arial; font-weight: bold;">' + modulo + '</span>';
                        var title_module = '<h2 class="label-praxis-module">PRAXIS</h2>';
                        if(nprog !== ''){
                            if(view !== '#' && view !== ''){

                                title_module = '<h2 class="label-praxis-module">' + modulo + '<br>' + title + '</h2>';
                                $('#divTitle').html(title_module);

                                if(view === '') {
                                    alert('The option is not available');
                                    return;
                                };

                                var codeProg = nprog.substring(0, 2) + nprog.substring(7,10);
                                $('#menuProgram').html(codeProg);
                                //var url = gloContextPath + '/' + view;
    //                            win.showModule({ vurl: url, id_menu: nprog });
                                //console.log(url);

                                var xpanel = Ext.getCmp('PXMVCAMHome-contenedor');
                            
                                try{
                                    xpanel.add({
                                        xtype: view//'sales-conciliation-asr-form'
                                    }).show();
                                    me.mostrarContenedor();
                                    console.log('ADD PANTALLA:' + nprog);
                                }catch(err){
                                    console.log(err);
                                }
                            }else{
                                global.Msg({
                                    msg: 'The option is not available',
                                    icon: 2,
                                    buttons: 1
                                });
                            }
                        }
                    });
                };
              }catch(err){
                lg(err);
              }

            var user = '';

            $.ajax({
                url : gloContextPath + '/getUser',
                type : 'POST',
                dataType : 'json',
                success : function(data){
                    // console.log(data);
                    user = data.user.USR.trim();//;
                    $('#menuUser').html(user);
                    gloUsr = user;
                },
                error : function(err){
                    // console.log(err);
                },
                complete : function(){
                    var nprog = 'PX000';
                    var dateTime = new Date();

                    var date = dateTime.getFullYear() + "/" + ("0" + (dateTime.getMonth() + 1)).slice(-2) + "/" + ("0" + dateTime.getDate()).slice(-2);
                    var time = ("0" + dateTime.getHours()).slice(-2)   + ":" + ("0" + dateTime.getMinutes()).slice(-2);

                    $('#menuProgram').html(nprog);
                    $('#menuDate').html(date);
                    $('#menuHour').html(time);
                }
            });

          }
        });

        var getTipoMenu = function (item) {
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

        var printMenu = function (item) {
            var tipo = getTipoMenu(item);

            var array = getChildMenus(item, tipo);
            var d, c = array.length, clase = '', nprog = '', view = '', title = '', modulo = '';

            switch (tipo) {
                case 'P': clase = 'menu-parent'; break;
                case 'C': clase = 'menu-column menu-open'; break;
                case 'S': clase = 'menu-submenu menu-closed'; break;
                case 'O': { 
                        clase = 'menu-option';
                        view = ' data-view="' + item.DESC2 + '"'; 
                        nprog = ' data-nprog="' + item.NPROG + '"';
                        title = ' data-title="' + item.DESC1 + '"'; 
                        modulo = ' data-modulo="' + item.MODULO + ' ' + item.MENU1.toUpperCase().replace(item.MODULO, '') + '"'; 
                    } break;
            }


            if (c + 1 > 0) htmlContent += '<ul class="' + clase + '">';

            //htmlContent += '<a>' + item.MENU + '-' + item.SMENU + '-' + item.TRANSA + '-' + item.DESC1 + '-' + item.NPROG + '-' + tipo + '</a>';
            if(tipo !== 'P'){
                htmlContent += '<li><a href="#"' + view + nprog + title + modulo +  '>' + item.DESC1 + '</a></li>';
            }

            for (d = 0; d < c; d++) {
                printMenu(array[d]);
            };

            if (c + 1 > 0) htmlContent += '</ul>';
        };

        var getChildMenus = function (item, tipo) {
            var childNodes = [];

            $.each(lista, function (i, x) {
                var smenu, transa;
                switch (tipo) {
                    case 'P': {
                        smenu = parseInt(x.SMENU);
                        transa = parseInt(x.TRANSA);
                        if (smenu % 100 === 0 && smenu > 0 && transa === 0) {
                            childNodes.push(x);
                        };

                    } break;

                    case 'C': {
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
                    } break;

                    case 'S': {
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
                        };
                    } break;

                    case 'O': break;

                }

            });

            return childNodes;
        };

        var makeid = function ()
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        };


        var getParentMenus = function () {
            var parents = [];
            $.each(data, function (x, y) {
                if (y.SMENU === '000') {
                    parents.push(y);
                }
            });
            return parents;
        };

        $('.close-menu').on('click', function(e){
            me.menuContentCollapse();
        });

        $('.menu-desktop').on('click', function(e){
            var boton = e.currentTarget;
            var estado = boton.getAttribute('status') || 'visible';

            if(estado === 'visible'){
                boton.setAttribute('status', 'hidden');
                me.mostrarDesktop();
            }else{
                boton.setAttribute('status', 'visible');
                me.ocultarDesktop();
            };
        });

        $('.menu-home').on('click', function(e){
            me.home();
        });

        $('.menu-logout').on('click', function(e){
            var url = gloContextPath + '/logout';
            $.get(url, function(data){
                var result = data;

                var redirect = gloContextPath;

                if(result === '1'){
                    //window.location = redirect;
                    window.location.href = redirect;
                };
            });
        });
    },
    toggleView: function(toggle){
        if(toggle){
            $('#PXMVCAMHome-region-content-north-body').css('visibility', 'hidden');
            $('#PXMVCAMHome-region-content-center-parent-body').css('visibility', 'hidden');
            $('#PXMVCAMHome-content-dashboard').fadeIn('slow');
        }else{
            $('#PXMVCAMHome-content-dashboard').hide();
            $('#PXMVCAMHome-region-content-north-body').css('visibility', 'visible');
            $('#PXMVCAMHome-region-content-center-parent-body').css('visibility', 'visible');
        }
    },
    getCustomerInfo: function(){
        var me = this;
        $.ajax({
            url : gloContextPath + '/getCustomerInfo',
            type: 'POST',
            dataType: 'json',
            success: function(response){
                var mtype = response.MTYPE;
                
                if(mtype !== 0){
                    isDashboard = false;
                    me.toggleView(false);
                    return false;
                }else{
                    isDashboard = true;
                }
                
                var makeid = function ()
                {
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                    for( var i=0; i < 5; i++ )
                        text += possible.charAt(Math.floor(Math.random() * possible.length));

                    return text;
                };
                
                $('#imgLogout').on('click', function(e){
                    var url = gloContextPath + '/logout';
                    var id = makeid();
                    url = url+'?id='+id;
                    $.get(url, function(data){
                        var result = data;

                        var redirect = gloContextPath;
                        //alert(url + ' - ' + redirect + ' - ' + PRAXIS + ' - ' + result + ' - ' + id);
                        if(result === '1'){
                            window.location.href = redirect;
                            //window.location.assign(redirect);
                        };
                    });
                });

                var dashMenus = [ ];

                $.ajax({
                    url : gloContextPath + '/getMenu',
                    type: 'POST',
                    dataType: 'json',
                    error : function(err){
                        lg(err);
                    },
                    success : function(response){
                      try {
                        var data = response;

                        var pdb = $('#panelDashButtons'), buttons = '';

                        $.each(data, function (x, y) {
                            if(y.MENU === '00' && y.TRANSA !== '00000'){
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

                        pdb.html(buttons);
                        me.toggleView(true);
                        //$('#panelDashboard').fadeIn('slow');

                        $('.dashboardButton').on('click', function(e){
                            var menu = e.currentTarget;
                            var nprog = menu.getAttribute('data-nprog').trim();
                            
                            if(nprog !== 'PX00PRAXIS'){   
                                var view = menu.getAttribute('data-view').trim();
                                
                                if(view !== '' && view !== '#'){
                                    if ( nprog === 'PX00000373' ){
                                        me.toggleView(false);
                                        window.location.assign('<%=request.getContextPath()%>' + '/' + view);
                                    }else{
//                                        if(!extLoaded) Ext.onReady(me.init, inicio);
                                        me.toggleView(false);

//                                        win.show({ vurl: view, id_menu: nprog });
                                        console.log('CLICK MENU>>AKI');
                                    }
                                }else{
                                    global.Msg({
                                        msg: 'The option is not available',
                                        icon: 2,
                                        buttons: 1
                                    });
                                }
                            }else{
//                                if(!extLoaded) Ext.onReady(me.init, inicio);
                                me.toggleView(false);
                                me.ocultarContenedor();
                                $('#menuCommands').removeClass('menuCommandRWD');
                            }
                        });
                      }catch(err){
                          lg(err);
                      }
                    }
                });
            },
            error: function(err){
                lg(err);
            }
        });        
    }
});
