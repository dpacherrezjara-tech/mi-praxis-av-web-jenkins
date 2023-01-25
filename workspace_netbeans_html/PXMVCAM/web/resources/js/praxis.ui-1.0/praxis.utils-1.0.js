/* 
 * To q this template, choose Tools | Templates
 * and open the template in the editor.
 * 
 * Autor  : asifuentes
 * Fecha  : 20/09/2016
 * Versión: 1.0
 * 
 */
var lg = function(s){ console.log(s); };
var clr = function(){ console.clear(); };

var PXU = function(params){
    var _this = this;
    var controller = params.controller || { };
    controller.grids = controller.grids || [];
    
    var actions = {
        INSERT: 'I',
        SAVE: 'S',
        UPDATE: 'U',
        DELETE: 'D'
    };
    
    var defaults = {
        autoLoad: true,
        pageSize: 20,
        
        methods: { 
           crud: 'crud',
            search: 'search'
        },
        
        layout: {
            toolbar:{
                height: 80
            },
            grid: {
                id: 'gridData',
                height: 535,
                width: 900,
                hidden: false,
                hiddenLabel: true
            },
            dataEntry: { 
                title: 'Data Entry Form',
                height: 310,
                width: 650
            },
            popup: {
                id: 'Data',
                title: 'Popup',
                height: 310,
                width: 650
            },
            dataView: {
                id: 'dataView'
            }
        },
        enablePagination: true,
        showSummaryRow: false,
        exportXLSMethod: 'getXLSX'
    };
    
    var messages = {
        OK: 'Operation was completed successfully',
        ERROR: 'An error ocurred when trying to process the request',
        NO_DATA: 'Data not found',
        CONFIRM: 'Are you sure to continue?',    
        CONFIRM_INSERT: 'Are you sure to save the record?',
        CONFIRM_UPDATE: 'Are you sure to update the record?',
        CONFIRM_DELETE: 'Are you sure to delete the record?',
        INSERTED: 'Record was inserted successfully',
        UPDATED: 'Record was updated successfully',
        DELETED: 'Record was deleted successfully',
        VALIDATE: 'Please enter required fields',
        WAIT: 'Please wait...'
    };
    
    this.actions = actions;
    this.rowMargin = '4px 0px';
    this.emptyText = "All";
    this.selectText = "Select";
    
    this.MESSAGES = messages;
    
    var commandKeys = {
        doSearch: 'search',
        toggleFilters: 'filter',
        exportToExcel: 'excel',
        clearFilters: 'clear',
        addNew: 'add',
        viewCharts: 'chart',
        goToBack: 'back',
        query: 'query',
        exportToText: 'text',
        addFavorite: 'favorite'
    };
    
    this.COMMANDKEYS = commandKeys;
    
    this.commandOptions = {
        keys: [ 'search', 'filter', 'excel', 'clear', 'add', 'back', 'query', 'text', 'favorite' ],
        pagination: {
            enabled: true
        }
    };
    
    var _search = function(_grid) {
        var resultExecute = executeListener(commandKeys.doSearch);
        if(resultExecute === undefined || resultExecute === null) resultExecute = true;
        if(!resultExecute) return false;        

        var grid = 'gridData';
        
        if(_grid === undefined){
            if(controller.drillDown){
                grid = controller.drillDown.current;
            }
        }else{
            grid = _grid;
        }
        
        controller.getSearchParams();
        
        var store = Ext.getCmp(controller.id + '-' + grid).getStore();
        store.removeAll();
        store.currentPage = 1;
        store.load({ params: controller.searchParams });
    };
    
    this.search = _search;
    
    var _back = function(){
        var resultExecute = executeListener(commandKeys.goToBack);
        if(resultExecute === undefined || resultExecute === null) resultExecute = true;
        if(!resultExecute) return false;
        
        //Obtener la cantidad de grids
        var nGrids = controller.grids.length;
        
        //Si no especifica drillDown o solo contiene una grilla, ir al home
        if (!controller.drillDown || nGrids === 1) {
            inicio.home();
        } else {
            //Sino, la grilla que se debe mostrar, es del nivel anterior
            var currentGrid = getCurrentVisibleGrid(controller.drillDown.current);
            var parentId = currentGrid.parentId;

            if(parentId){ 
                controller.drillDown.current = parentId;
                setCurrentVisibleGrid(parentId);
            }else{
                inicio.home();
            }
        }
    };

    this.getDataStore = function(params){
        var listeners = params.listeners || { };
        var fn = function(obj){ };
        
        if(listeners.load){
            fn = listeners.load || listeners.load.fn || function(obj){ };
        }
        
        listeners.load = function(obj) { 
            gridHasData(obj,params); 
            fn(obj);
            var labelTotal = Ext.getCmp(obj.parentId + '-pagging-total');
            
            if(labelTotal) {  
                obj.totalCount = obj.totalCount || '0';
                labelTotal.setHtml('of <b>' + _formatLngNumber(parseInt(obj.totalCount)) +'</b> results.');
            }
        };
        
        var st = Ext.create('Ext.data.Store', {
            fields:params.fields,
            autoLoad: params.hasOwnProperty('autoLoad') ? params.autoLoad : defaults.autoLoad,
            pageSize:params.pageSize || defaults.pageSize,
            proxy:{
                type: 'ajax',
                url: controller.url + (params.method || defaults.methods.search),
                reader:{
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            listeners: listeners
        });

        return st;
    };
    
    this.getDataStoreLoad = function(params, funcion){
        var listeners = params.listeners || { };
        var fn = listeners.load || function(){ funcion(); };
        
        listeners.load = function(obj) {
            gridHasData(obj,params);
            fn();
            var labelTotal = Ext.getCmp(obj.parentId + '-pagging-total');
            
            if(labelTotal) {  
                obj.totalCount = obj.totalCount || '0';
                labelTotal.setHtml('of <b>' + _formatLngNumber(parseInt(obj.totalCount)) +'</b> results.');
            }
        };
        
        var st = Ext.create('Ext.data.Store', {
            fields:params.fields,
            autoLoad: params.hasOwnProperty('autoLoad') ? params.autoLoad : defaults.autoLoad,
            pageSize:params.pageSize || defaults.pageSize,
            proxy:{
                type: 'ajax',
                url: controller.url + (params.method || defaults.methods.search),
                reader:{
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            listeners: listeners
        });

        return st;
    };

    this.getFields = function(params){
        var fields = [ ];

        $.each(params.dataProvider, function(i,field){
            if(field.name){
                fields.push({name: field.name, type: field.type });
            }else{
                if(field.columns){
                    $.each(field.columns, function(j,column){
                        if(column.name){
                            fields.push({name: column.name, type: column.type }); 
                        }else{
                            if(column.columns){
                                $.each(column.columns, function(j,c2){
                                    if(c2.name) fields.push({name: c2.name, type: c2.type }); 
                                });
                            }
                        }
                    });
                }
            }
        });

        return fields;
    };

    var getAlign = function(align){
        switch(align){
            case 'R': return 'right'; break;
            case 'C': return 'center'; break;
             default: return 'left'; break;
        };
    };
    
    this.getColumns = function(params){
        var fields = [ ];
        $.each(params.dataProvider, function(i,field){
            var obj = { };
            if(!field.columns && field.hasOwnProperty('text')){
                obj = { dataIndex: field.name, text: field.text };

                var align = getAlign(field.align || 'L');

                if(field.width) obj.width = field.width;
                else if(field.flex) obj.flex = field.flex;
                obj.align = align;

                if(field.id) obj.id = field.id;
                if(field.type) obj.type = field.type;
                if(field.renderer) obj.renderer = field.renderer;
                if(field.summaryType) obj.summaryType = field.summaryType;
                if(field.menuDisabled) obj.menuDisabled = field.menuDisabled;
                if(field.cls) obj.cls = field.cls;
                if(field.hasOwnProperty('hidden')) obj.hidden = field.hidden;

                if(field.xtype) obj.xtype = field.xtype;
                if(field.listeners)obj.listeners = field.listeners;
                if(field.widget) obj.widget = field.widget;
                if(field.editor) obj.editor = field.editor;
                
                obj.level = 1;
                fields.push(obj);
            }else{
                if(field.columns){
                    obj = { text: field.text, columns: [ ] };
                    if(field.hasOwnProperty('id')) obj.id = field.id;
                    if(field.hasOwnProperty('cls')) obj.cls = field.cls;
                    
                    $.each(field.columns, function(j,column){
                        
                        if(!column.columns && column.text){
                            var c = { dataIndex: column.name, text: column.text };
                            var align = getAlign(column.align || 'L');

                            if(column.width) c.width = column.width;
                            else if(column.flex) c.flex = column.flex;
                            c.align = align;

                            if(column.id) c.id = column.id;
                            if(column.type) c.type = column.type;
                            if(column.renderer) c.renderer = column.renderer;
                            if(column.summaryType) c.summaryType = column.summaryType;
                            if(column.menuDisabled) c.menuDisabled = column.menuDisabled;
                            if(column.cls) c.cls = column.cls;
                            if(column.hasOwnProperty('hidden')) c.hidden = column.hidden;
                            if(column.xtype) c.xtype = column.xtype;
                            if(column.listeners)c.listeners = column.listeners;
                            if(column.widget) c.widget = column.widget;
                            if(column.editor) c.editor = column.editor;
                            
                            c.level = 2;
                            obj.columns.push(c);
                        }else{
                            if(column.columns){
                                c = { text: column.text, columns: [ ] };
                                if(column.hasOwnProperty('id')) c.id = column.id;
                                if(column.hasOwnProperty('cls')) c.cls = column.cls;
                                
                                $.each(column.columns, function(k,subcolumn){
                                    if(subcolumn.text){
                                        var d = { dataIndex: subcolumn.name, text: subcolumn.text };
                                        var align = getAlign(subcolumn.align || 'L');

                                        if(subcolumn.width) d.width = subcolumn.width;
                                        else if(subcolumn.flex) d.flex = subcolumn.flex;
                                        d.align = align;

                                        if(subcolumn.id) d.id = subcolumn.id;
                                        if(subcolumn.type) d.type = subcolumn.type;
                                        if(subcolumn.renderer) d.renderer = subcolumn.renderer;
                                        if(subcolumn.summaryType) d.summaryType = subcolumn.summaryType;
                                        if(subcolumn.menuDisabled) d.menuDisabled = subcolumn.menuDisabled;
                                        if(subcolumn.cls) d.cls = subcolumn.cls;
                                        if(subcolumn.hasOwnProperty('hidden')) d.hidden = subcolumn.hidden;
                                        if(subcolumn.xtype) d.xtype = subcolumn.xtype;
                                        if(subcolumn.listeners)d.listeners = subcolumn.listeners;
                                        if(subcolumn.widget) d.widget = subcolumn.widget;
                                        if(subcolumn.editor) d.editor = subcolumn.editor;
                                        
                                        d.level = 3;
                                        c.columns.push(d); 
                                    }
                                });
                            }
                            
                            c.level = 2;
                            obj.columns.push(c);
                        }
                    });

                    obj.level = 1;
                    fields.push(obj);
                }
            }
        });

        return fields;
    };
    
    this.showDataEntry = function(op, index, opts){
        var fields = controller.getDataEntryFields(op);
        var btns = getCRUDButtons(op);
        
        var win = Ext.create('Ext.window.Window',{
            id: controller.id + '-dataEntry',
            title: controller.dataEntry.title + ' - ' + defaults.layout.dataEntry.title || defaults.layout.dataEntry.title,
            header: true,
            bodyStyle: 'background: transparent',
            width: opts.width || defaults.layout.dataEntry.width,
            height:  opts.height || defaults.layout.dataEntry.height,
            border: false,
            resizable: false,
            margin: 10,
            layout:{
                type:'border'
            },
            modal: true,
            items: {
                region: 'center',
                id: controller.id + '-center',
                border: false,
                //height:280,
                padding: '2px 2px 2px 2px',
                //bodyStyle: 'background: transparent',
                bbar: btns,
                items: fields
            },
            listeners: {
                afterrender: function(obj, e){
                    if(op) controller.setDataEntryValues(index);
                }
            }
            
        }).show();
    };
    
    var getPaginator = function(params) {
        return [{
            xtype: 'pagingtoolbar',
            id: params.id + '-pagging',
            pageSize: params.pageSize,
            border:false,
            store:  params.store,
            displayInfo: false,
            hidden: params.hidden
        },{
            xtype: 'label',
            id: params.id + '-pagging-total',
            html: 'of <b>0</b> results.' ,
            width: 100,
            style: 'font-size:8pt',
            hidden: params.hidden
        }];
    };
    
    var getCurrentVisibleGrid = function(id) {
        var grid = { };
        id = controller.id + '-' + id;
        
        $.each(controller.grids, function(i, itemx) {
            var item = itemx.role === 'grid' ? itemx.items[1] : itemx;
            if(item.id === id){
                grid = item;
            };
        });
        
        return grid;
    };
    
    var setCurrentVisibleGrid = function(id) {
        //Recorrer todas las grillas y evaluar cuando la el id de la iteración ("gridId") del bucle sea igual que el id del parametro (id)
        id = controller.id + '-' + id;

        $.each(controller.grids, function(i, item) {
            
            var gridId = item.items[1].id;
            //var grid = Ext.getCmp(controller.id + '-' + gridId);
            var grid = Ext.getCmp(gridId);
            var gridLabel = Ext.getCmp(gridId + '-label');
            var gridFooter = Ext.getCmp(gridId + '-footer');
            
            if(item.items[1].id === id){
                grid.show();
                if(gridLabel)gridLabel.show();
                if(gridFooter)gridFooter.show();
            } else{
                grid.hide();
                if(gridLabel)gridLabel.hide();
                if(gridFooter)gridFooter.hide();
            }
            
            //Si tiene paginacion, ocultar o mostrar la paginacion            
            
            if(item.items[1].enablePagination){
                //var gridPagging = Ext.getCmp(controller.id + '-' + gridId + '-pagging');                
                var gridPagging = Ext.getCmp(gridId + '-pagging');
                var gridPaggingTotal = Ext.getCmp(gridId + '-pagging-total');
                
                
                if(item.items[1].id === id){
                    gridPagging.show();
                    gridPaggingTotal.show();                    
                }else{
                    gridPagging.hide();
                    gridPaggingTotal.hide();                    
                }
            }
        });
        
        /*
        //Recorrer todas las grillas y evaluar cuando la variable de iteración ("i") del bucle sea igual que el nivel ("level")
        for (i = 0; i < nGrids; i++) {
            var element = controller.grids[i];
            var id = element.id;
            var grid = Ext.getCmp(controller.id + '-' + id);

            if(i === level){
                grid.show();
            }else{
                grid.hide();
            }

            //Si tiene paginacion, ocultar o mostrar la paginacion
            if(element.enablePagination){
                var gridPagging = Ext.getCmp(controller.id + '-' + id + '-pagging');

                if(i === level){
                    gridPagging.show();
                }else{
                    gridPagging.hide();
                }
            }
        }
        */
    };
    
    var _setVisibleGrid = function(id,flag){
        var gridId = controller.id + '-' + id;
        var grid = Ext.getCmp(gridId);
        var gridLabel = Ext.getCmp(gridId + '-label');
        var gridFooter = Ext.getCmp(gridId + '-footer');
        
        //if(grid !== undefined){
            if(flag === true){
                grid.show();
                if(gridLabel)gridLabel.show();
                if(gridFooter)gridFooter.show();
            } else{
                grid.hide();
                if(gridLabel)gridLabel.hide();
                if(gridFooter)gridFooter.hide();
            }
        //}

        //Si tiene paginacion, ocultar o mostrar la paginacion            
        //grid !== undefined && 
        if(grid.enablePagination){
            var gridPagging = Ext.getCmp(gridId + '-pagging');
            var gridPaggingTotal = Ext.getCmp(gridId + '-pagging-total');


            if(flag === true){
                gridPagging.show();
                gridPaggingTotal.show();                    
            }else{
                gridPagging.hide();
                gridPaggingTotal.hide();                    
            }
        }
    };
    
    this.setVisibleGrid = _setVisibleGrid;
    
    var executeListener = function(id){
        var result;
        controller.functions = controller.functions || { };        
        $.each(controller.functions, function(i, func){    
            if(func.id === id) { result = func.fn(); }
        });
        
        return result;
    };
    
    this.getDefaultToolBar = function(params){
        params = params || {};
        var toolBar = [ ];
        
        /*
        toolBar.push({
            width:20,
            border:false
        });
        */
       
        toolBar.push('-');
        
        //Search
        if(!params.hasOwnProperty("hiddenSearch")){
            toolBar.push({
                id: controller.id + '-search',
                xtype:'button',
                icon: 'img/botones/search.png',
                tooltip :'Search',
                listeners:{
                    click: function(obj, e){
                        _search();
                    }
                }
            });
        }
        //Toggle filters
        if(!params.hasOwnProperty("hiddenFilter")){
            toolBar.push({
                xtype:'button',
                id: controller.id+'-btn-filter',
                icon: 'img/botones/filter.png',
                tooltip :'Hide/Show filter',
                listeners:{
                    click: function(obj, e){
                        Ext.getCmp(controller.id + '-form-filter-data').setVisible(controller.hiddenFilter);
                        controller.hiddenFilter = !controller.hiddenFilter;

                        $('#' + controller.id + '-centerC').css('top', (controller.hiddenFilter ? 40: controller.toolbar ? controller.toolbar.height : defaults.layout.toolbar.height));
                        Ext.getCmp(controller.id + '-btn-filter').setTooltip(controller.hiddenFilter ? 'Hide filter': 'Display filter');

                        executeListener(commandKeys.toggleFilters);
                    }
                }
            });
        }
        
        //Charts
        if(params.hasOwnProperty("viewCharts")){
            toolBar.push({
                xtype:'button',
                icon: 'img/botones/chart.png',
                tooltip :'View charts',
                listeners:{
                    click: function(obj, e){
                        var resultExecute = executeListener(commandKeys.viewCharts);
                        if(resultExecute === undefined || resultExecute === null) resultExecute = true;
                        if(!resultExecute) return false;

                        //Default methods
                    }
                }
            });
        }        
        
        //Export to Excel
        if(!params.hasOwnProperty("hiddenExcel")){
            toolBar.push({
                xtype:'button',
                icon: 'img/botones/excel.png',
                tooltip :'Export to Excel',
                listeners:{
                    click: function(obj, e){
                        var resultExecute = executeListener(commandKeys.exportToExcel);
                        if(resultExecute === undefined || resultExecute === null) resultExecute = true;
                        if(!resultExecute) return false;

                        controller.drillDown = controller.drillDown || { };
                        controller.drillDownSet = controller.drillDownSet || { };
                        
                        var grid = '';
                        
                        if(controller.drillDownSet.current){
                            grid = getCurrentVisibleGrid(controller.drillDownSet.current[0]);
                        }else{
                            grid = getCurrentVisibleGrid(controller.drillDown.current || defaults.layout.grid.id);
                        }
                        
                        if(grid.exportXLSMethod)controller.getSearchParams();
                        var data = grid.exportXLSMethod ? (controller.drillDownSet.params || controller.drillDown.params) : controller.searchParams;
                        
                        var schema = JSON.stringify({ text: "", columns: grid.columns.items });
                        lg(schema);
                        data.schema = schema;
                        lg(schema);
                        
                        var url = controller.url;
                        params = Object.keys(data).map(function(k) {
                            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
                        }).join('&');

                        var method =  grid.exportXLSMethod || defaults.exportXLSMethod;
                        url += method + '?' + params;

                        global.getFile(url);
                    }
                }
            });
        }
        //Clear filters
        toolBar.push({
            xtype:'button',
            icon: 'img/botones/clear.png',
            tooltip :'Clear Options',
            listeners:{
                click: function(obj, e){
                    if(controller.clearFilters) controller.clearFilters();
                    
                    executeListener(commandKeys.clearFilters);
                }
            }
        });
        
        //Add new record
        if (controller.dataEntry){
            if(!controller.dataEntry.hasOwnProperty('hiddenAdd')){
                toolBar.push({
                    xtype:'button',
                    icon: 'img/botones/add.png',
                    tooltip :'Add',
                    listeners:{
                        click: function(obj, e){
                            var px = new PXU({ controller: controller});
                            px.showDataEntry(false, 0, controller.dataEntry);

                            executeListener(commandKeys.addNew);
                        }
                    }
                });
            }
        }
        
        //Array botones
        if(params.buttons){
            $.each(params.buttons, function(i,j){
                toolBar.push(params.buttons[i]);
            });                        
        }
        
        //Go back (Fito)
        toolBar.push({
            xtype:'button',
            icon: 'img/botones/back.png',
            tooltip :'Back',
            listeners:{
                click: function(obj, e){
                    _back();
                    //Obtener la cantidad de grids
                    /*var nGrids = controller.grids.length;
                    
                    //Si no especifica drillDown o solo contiene una grilla, ir al home
                    if (!controller.drillDown || nGrids === 1) {
                        inicio.home();
                    } else {
                        //Sino, la grilla que se debe mostrar, es del nivel anterior
                        var currentGrid = getCurrentVisibleGrid(controller.drillDown.current);
                        var parentId = currentGrid.parentId;
                        
                        if(parentId){ 
                            controller.drillDown.current = parentId;
                            setCurrentVisibleGrid(parentId);
                        }else{
                            inicio.home();
                        }
                    }
                    
                    executeListener(commandKeys.goToBack); */                  
                }
            }
        });
        
        toolBar.push('-');
        
        var tools = {
            xtype:'panel',
            border:false,
            bodyStyle: 'background: #E3EAF9',
            style: 'border: 1px solid #d0d0d0; border-bottom:none !important;',
            //padding:'2px 5px 1px 5px',
            width: controller.defaultWidth,
            tbar: toolBar
        };

        return tools;
    };
    
    var _getDrillDown = function(id){
        controller.drillDown = controller.drillDown || { };
        controller.drillDown.current = id;
        
        setCurrentVisibleGrid(controller.drillDown.current);
    };
    
    this.getDrillDown = _getDrillDown;
    
    this.getDefaultBar = function(params){
        
        if(params.tools){
            //Crear paginador por cada grilla que especifique paginación
            if(params.grids){
                $.each(params.grids.items, function(i, j){
                    var g = j.items[1];
                    if (g && g.enablePagination) {
                        var hidden = g.hidden;
                        var id = g.id;
                        var store = g.store;
                        var pageSize = store.pageSize;

                        var opts = {
                          id: id,
                          hidden: hidden,
                          store: store,
                          pageSize: pageSize
                        };

                        var pagger = getPaginator(opts);
                        params.tools.tbar.unshift(pagger[1]);
                        params.tools.tbar.unshift(pagger[0]);
                    }
                });
            }
            
            if(params.pagGrid){
                var g = params.pagGrid;
                var opts = {
                    id: g.id,
                    hidden: g.hidden,
                    store: g.store,
                    pageSize: g.store.pageSize
                  };

                  var pagger = getPaginator(opts);
                  params.tools.tbar.unshift(pagger[1]);
                  params.tools.tbar.unshift(pagger[0]);
            }
        }
        
        params.tools.tbar.unshift('->');
        
        var panel = Ext.create('Ext.form.Panel',{
            id: controller.id + '-form',
            border:false,
            layout: 'border',
            bodyCls: 'colorFondo',
            defaults:{
                border: false,
                autoScroll:false
            },
            items:[
                {
                    region:'west',
                    id:controller.id + '-west',
                    bodyStyle: 'background: transparent',
                    border:false
                },
                {
                    region:'east',
                    id:controller.id + '-east',
                    bodyStyle: 'background: transparent',
                    border:false
                },
                {
                    xtype:'panel',
                    region:'center',
                    id:controller.id + '-centerCC',
                    bodyStyle: 'background: transparent',
                    layout:'fit',
                    items:[
                        {
                            xtype:'panel',
                            bodyStyle: 'background: transparent',
                            layout:'border',
                            id:controller.id + '-contentFull',
                            border:false,
                            autoScroll:false,
                            items:[
                                {
                                    region:'north',
                                    id:controller.id+'-contentFilter',
                                    border:false,
                                    height: controller.toolbar ? controller.toolbar.height : defaults.layout.toolbar.height,
                                    layout:'border',
                                    bodyCls: 'background: #E3EAF9',
                                    items:[
                                        {
                                            region:'center',
                                            xtype:'panel',
                                            padding:2,
                                            border:false,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items:[
                                                params.tools,
                                                params.filters
                                            ]
                                        }
                                    ]
                                },
                                params.grids,
                                params.panel
                            ]               
                        }
                    ]
                }
            ]
        });

        var xpanel =
        {
            id: controller.id + '-xpanel',
            border: false,
            //scrollable: true,
            closable: false,
            layout:{
                type: 'fit'
            },
            items:[ panel ],
            listeners:params.listeners || { } 
        };

        return xpanel;
    };

    this.getDefaultGridLayout = function(params){
        var grids =
        {
            region:'center',
            bodyStyle: 'background: transparent',//;border:1px solid red
            id: controller.id + '-centerC',
            //width: controller.defaultWidth,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            border: false,
            //autoScroll:false,
            scrollable: true,
            items: params.grids
        };
        
        return grids;
    };

    this.getDefaultGrid = function(params) {
        params = params || { };
        
        var store = params.storeDataSource || controller.storeDataSource;
        store.parentId = controller.id + '-' + (params.id || defaults.layout.grid.id);
        //Mostrar mensaje cuando no se recuperaron filas en la grilla
        /*
        store.on('load', function(obj){ 
            pxutils.gridHasData(obj);
        });
        */
        
        var listeners = {
            select:function(obj, record, index, eOpts ){
            }
        };
        
        var grid = {
            xtype: 'grid',
            id: controller.id + '-' + (params.id || defaults.layout.grid.id),
            store: store,
            columnLines: true,
            autoScroll:true,
            hidden: params.hidden || defaults.layout.grid.hidden,
            parentId: params.parentId,
            parents: params.parents || [ ],
            exportXLSMethod: params.exportXLSMethod,
            enablePagination: params.hasOwnProperty('enablePagination') ? params.enablePagination : defaults.enablePagination,
            width: params.width  || controller.defaultWidth,
            height:params.height || defaults.layout.grid.height,
            features: [{
                ftype: 'summary',
                dock: 'bottom',
                showSummaryRow: params.showSummaryRow || defaults.showSummaryRow
            }],                
            layout: {
                align: 'center'//,type: 'vbox'
            },
            scrollable: true,
            columns:{
                items: this.getColumns({ dataProvider: params.gridProvider || controller.gridProvider })
            },
            listeners: params.listeners || listeners,
            viewConfig: {
                stripeRows: true,
                enableTextSelection: false,
                markDirty: false,
                getRowClass: function(record, rowIndex, rowParams, store) {
                    if (rowIndex%2 === 0)return 'rowA';

                }
            },
            trackMouseOver: true            
        };
        
        if(params.style){
            grid.style = params.style;
        }
        
        if(params.selType)grid.selType = params.selType;
        if(params.selModel)grid.selModel = params.selModel;
        if(params.plugins)grid.plugins = params.plugins;
        
        var label = {
            padding: '0px 0px 6px 0px',
            xtype:'label',
            id: controller.id + '-' + (params.id || defaults.layout.grid.id) + '-label',
            html: '',
            width: '100%',
            heigth: 50,
            style: 'text-align:center; font-weight:bold;'
        };

        params.footer = params.footer || { };
        
        var footer = {
            xtype:'panel',
            border: params.footer.border || false,
            id: controller.id + '-' + (params.id || defaults.layout.grid.id) + '-footer',
            bodyStyle: 'background: transparent',
            layout:'column',
            items: params.footer.items || [{ }],
            cls: params.footer.cls || '',
            style: params.footer.style || ''
        };     
        
        return {
                xtype:'panel',
                border: false,
                bodyStyle: 'background: transparent;',
                layout:'column',
                width: params.width  || controller.defaultWidth,
                items: [label,grid,footer],
                role: 'grid'
            };
    };

    var CRUD = function(params){
        var data = controller.getDataEntryValues(params.option);
        
        if(!controller.validateDataEntry(data)){    
            global.Msg({
                msg: win.getChangeMsn(params.option),
                icon: 3,
                buttons: 3,
                fn: function(btn){
                    if (btn === 'yes'){
                        var mask = new Ext.LoadMask(Ext.getCmp(controller.id + '-center'),{
                            msg: messages.WAIT
                        });
                        mask.show();
                        
                        Ext.Ajax.request({
                            url: controller.url + params.method,
                            params: data,
                            success: function(response,options){
                                mask.hide();
                                var res = Ext.decode(response.responseText);
                                
                                if(res.success){
                                    global.Msg({
                                        msg:res.response,
                                        icon:1,
                                        fn:function(){
                                            Ext.getCmp(controller.id + '-dataEntry').close();
                                            _search();
                                        }
                                    });
                                }else{
                                    global.Msg({
                                        msg:res.response,
                                        icon:0,
                                        fn:function(){
                                            //fail
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    };
    
    var getCRUDButtons = function(recordExists){
        var toolButtons = [ ];
                
        toolButtons.push(' ');
        
        toolButtons.push({
            xtype: 'button',
            id: controller.id+'-save',
            icon: 'img/botones/24x24/1337982029_3floppy_unmount.png',
            text:'Save',
            height: 30,
            scale: 'medium',
            hidden : recordExists,
            listeners: {
                beforerender: function(obj, opts){
                },
                click: function(obj, e){
                    CRUD({ option: actions.INSERT, method: defaults.methods.crud });
                }
            }
        });
                
        toolButtons.push({
            xtype:'button',
            id:controller.id+'-update',
            icon: 'img/botones/24x24/1337982080_system-software-update.png',
            text:'Update',
            height:30,
            scale: 'medium',
            hidden : !recordExists,
            listeners:{
                beforerender: function(obj, opts){
                },
                click: function(obj, e){
                   CRUD({ option: actions.UPDATE, method: defaults.methods.crud });
                }
            }
        });
        
        if(!controller.dataEntry.hasOwnProperty('hiddenDel')){
            toolButtons.push({
                xtype:'button',
                id:controller.id+'-delete',
                icon: 'img/botones/24x24/1376621085_gnome-panel-force-quit.png',
                text:'Delete',
                height:30,
                scale: 'medium',
                hidden : !recordExists,
                listeners:{
                    beforerender: function(obj, opts){
                    },
                    click: function(obj, e){
                        CRUD({ option: actions.DELETE, method: defaults.methods.crud });
                    }
                }
            });
        }
        
        toolButtons.push({
            xtype:'button',
            id:controller.id+'-cancel',
            scale: 'medium',
            icon: 'img/botones/24x24/1337982061_001_05.gif',
            text:'Cancel',
            height:30,
            listeners:{
                beforerender: function(obj, opts){
                },
                click: function(obj, e){
                    Ext.getCmp(controller.id + '-dataEntry').close();
                }
            }
        });
        
        if(controller.dataEntry.hasOwnProperty('btns')){
            for(var i=0;i<controller.dataEntry.btns.length;i++){
                toolButtons.push(controller.dataEntry.btns[i]);
            }            
        }
        
        return  toolButtons;            
    };
    
    this.getRequiredSymbol = function(){
        return '<span style="color: darkred; font-size:8pt">&nbsp;<b>(*)</b>&nbsp;</span>';
    };
    
    /*this.gridHasData = function(obj,params){
        if(obj.data.items.length === 0) 
        {
            var enableAutoBack = controller.hasOwnProperty('enableAutoBack') ? controller.enableAutoBack : (controller.grids[0].id !== controller.id + '-gridData' ? true: false );   
            global.Msg({ msg: (params.hasOwnProperty('msg') ? params.msg : messages.NO_DATA), icon: 1, buttons: 1 });
            //global.Msg({ msg: messages.NO_DATA, icon: 1, buttons: 1 });
            if(controller.grids.length > 1 && enableAutoBack){
                _back();
            }
        }
    };*/
    var gridHasData = function(obj,params){
        if(obj.data.items.length === 0) 
        {
            //var enableAutoBack = controller.hasOwnProperty('enableAutoBack') ? controller.enableAutoBack : (controller.grids[0].id !== controller.id + '-gridData' ? true: false );
            var enableAutoBack = params.hasOwnProperty('enableAutoBack') ? params.enableAutoBack : false;
            var enableMsg = params.hasOwnProperty('enableMsg') ? params.enableMsg : true;
            
            if(enableMsg)global.Msg({ msg: (params.hasOwnProperty('msg') ? params.msg : messages.NO_DATA), icon: 1, buttons: 1 });
            
            if(controller.grids.length > 1 && enableAutoBack){
                _back();
            }
        }
    };

    
    this.showPopup = function(params){        
        var btns = getPopupButtons(params);
        
        var win = Ext.create('Ext.window.Window',{
            id: controller.id + '-popup-' + (params.id || defaults.layout.popup.id),
            title: params.title || defaults.layout.popup.title,
            header: true,
            bodyStyle: 'background: transparent',
            width: params.width || defaults.layout.popup.width,
            height:  params.height || defaults.layout.popup.height,
            border: false,
            resizable: false,
            margin: 10,
            layout:{
                type:'border'
            },
            modal: true,
            items: {
                region: 'center',
                id: controller.id + '-popup' + '-center',
                border: false,
                padding: '2px 2px 2px 2px',
                bbar: btns,
                items: params.fields 
            },
            listeners: {
                afterrender: params.afterrender || function(){ }
            }            
        }).show();
    };
    
    var getPopupButtons = function(params){
        
        var toolButtons = [ ];
                
        toolButtons.push(' ');
        
        //CANCEL
        toolButtons.push({
                xtype:'button',
                id: controller.id + '-popup-cancel',
                scale: 'medium',
                icon: 'img/botones/1337983423_Cancel__Red.png',
                text:'Close',
                height:30,
                listeners:{
                    beforerender: function(obj, opts){
                    },
                    click: function(obj, e){
                        Ext.getCmp(controller.id + '-popup-' + (params.id || defaults.layout.popup.id)).close();
                    }
                }
            });
        
         //ADICIONAL   
         toolButtons.push(params.btns);   
        
        return  toolButtons;           
    };
    
    var filters = {
        getControlLabel: function(s, style){
            style = style || '';
            return '<strong style="color:#000;' + style + '">' + s + '</strong>';
        },

        getHTMLLabel: function(s, style){
            style = style || '';
            return '<span style="padding-top:5px;' + style + '">' + s + '</span>';
        }
    };
    
    this.filters = filters;
    
    this.UI = {
        getLabel: function(params){
            params.label = params.label || { };
            params.label.text = params.label.text || 'Field';
            var padding = (params.top || '0') + 'px '+ (params.right || '0')+'px '+ (params.bottom || '0')+'px '+ (params.left || '0')+'px';
            
            var obj = {
                    xtype:'label',
                    html: params.label.text,
                    //labelAlign:params.label.align || 'left',
                    width: '100%',
                    anchor:'100%',
                    style: params.label.style || ''
                };
                
            if(params.id){
                obj.id = controller.id + params.id;
            }
            
            return {
                width: params.width,
                border:false,
                style: params.style || '',
                padding: padding,
                bodyStyle: 'background: transparent;text-align:' + params.label.align || 'left',
                items: [obj]
            };
        },
        getComboBox: function(params){
            params.label = params.label || { };
            var padding = (params.top || '0') + 'px '+ (params.right || '2')+'px '+ (params.bottom || '0')+'px '+ (params.left || '0')+'px';
            var listeners = params.listeners || { };
            
            var _afterRender = function(obj) {
                obj.setValue(params.value || '');
            };
            
            listeners.afterrender = listeners.afterrender || _afterRender;

            return {
                width: params.width,
                border:false,
                padding: padding,  
                bodyStyle: 'background: transparent',
                items: [
                    {
                        xtype:'combo',
                        fieldLabel: params.label.text ? filters.getControlLabel(params.label.text || '', params.label.style || '') : '',
                        id: controller.id + params.id,
                        store: params.store,
                        labelAlign: params.label.align || 'left',
                        queryMode: 'local',
                        triggerAction: 'all',
                        editable: params.hasOwnProperty('editable') ? params.editable : true,
                        disabled: params.hasOwnProperty('disabled') ? params.disabled : false,
                        autoSelect: false,
                        enableKeyEvents: false,
                        //caseSensitive: false,
                        valueField: params.VF || 'code',
                        displayField: params.DF || 'name',
                        emptyText: params.text || this.emptyText,
                        labelWidth: params.label.width || 0,
                        width: '100%',
                        anchor:'100%',
                        hidden : params.hasOwnProperty('hidden') ? params.hidden : false,
                        anyMatch: true,
                        listeners: listeners,
                        tpl: params.tpl || ''
                    }
                ]
            };
        },
        getTextBox: function(params){
            params.label = params.label || { };
            var listeners = params.listeners || { };
            
            listeners.afterrender = listeners.afterrender || function(obj) { obj.setValue(''); };
            //lg({ id: controller.id + params.id, listeners: listeners });
            
            var padding = (params.top || '0') + 'px '+ (params.right || '0')+'px '+ (params.bottom || '0')+'px '+ (params.left || '0')+'px';

            var metods = {
                xtype:'textfield',
                id: controller.id + params.id,
                fieldLabel: params.label.text ? filters.getControlLabel(params.label.text || '', params.label.style || '') : '',
                labelAlign:params.label.align || 'left',
                labelWidth: params.label.width || 0,
                width: '100%',
                anchor:'100%',
                enableKeyEvents: true,
                fieldStyle: 'text-align: ' + (params.align || 'left'),
                editable: params.hasOwnProperty('editable') ? params.editable : true,
                readOnly: params.hasOwnProperty('readOnly') ? params.readOnly : false,
                hidden : params.hasOwnProperty('hidden') ? params.hidden : false,                  
                listeners: listeners
            };    
            
            if(params.hasOwnProperty('maxLength')) metods.maxLength = params.maxLength;
            if(params.hasOwnProperty('enforceMaxLength')) metods.enforceMaxLength = params.enforceMaxLength;
            if(params.hasOwnProperty('maskRe')) metods.maskRe = params.maskRe;
            if(params.hasOwnProperty('style')) metods.fieldStyle = params.style;

            return {
                width: params.width,
                border:false,
                padding: padding,
                bodyStyle: 'background: transparent',
                layout: 'column',
                items: [ metods ]
            };
        },
        getPanel: function(items, params){
            params = params || { };
            params.style = params.style || 'margin-top:0px; padding: 0px 4px';
            params.bgColor = params.bgColor || 'transparent';
            params.cls = params.cls || '';
            //alert(params.xtype);
            var obj = {
                xtype: params.xtype || 'panel',
                border: params.hasOwnProperty('border') ? params.border : false,
                bodyStyle: 'background: ' + params.bgColor,
                layout: { 
                    type: params.layout || 'column',
                    pack: params.align || 'left'
                },
                items: items,
                cls: params.cls,
                style: params.style,
                role: 'panel',
                parents: params.parents || []
            };
            
            if(params.width){
                obj.width = params.width;
            }else{
                obj.columnWidth = 1;
            }
            
            if(params.id){
                obj.id = params.id;
            }
            
            if(params.height) obj.height = params.height;
            if(params.visible) obj.visible = params.visible;
            if(params.hidden) obj.hidden = params.hidden;
            if(params.scrollable) obj.scrollable = params.scrollable;
            
            return obj;
        },
        getPanelRow: function(items, params){
            params = params || { };
            params.style = params.style || 'margin-top:0px; padding: 0px 4px';
            params.bgColor = params.bgColor || 'transparent';
            params.cls = params.cls || '';
            
            var obj = {
                xtype: params.xtype || 'panel',
                border: params.hasOwnProperty('border') ? params.border : false,
                bodyStyle: 'background: ' + params.bgColor,
                layout:'column',
                items: items,
                cls: params.cls,
                style: params.style,
                role: 'panel',
                parents: params.parents || []
            };
            
            if(params.width){
                obj.width = params.width;
            }
            
            if(params.id){
                obj.id = params.id;
            }
            
            if(params.height) obj.height = params.height;
            if(params.visible) obj.visible = params.visible;
            if(params.hidden) obj.hidden = params.hidden;
            
            return obj;
        },
        getDateComboBoxGroup: function(params){
            var defPadding = '';
            
            var top = '5';
            
            if(params.hasOwnProperty('top')){
                top = params.top.toString();
            };
            
            defPadding = top + 'px 2px 0px 0px';
                        
            var aniosStore = win.getStoreYear(false);       
            var mesesStore = params.FM.hasOwnProperty('all') ? (params.FM.all === true ? win.getStoreMonth(true) : win.getStoreMonth(false)) : win.getStoreMonth(true);
            var diasStore = win.getStoreDays(true);
    
            var onlyFrom = params.onlyFrom || false;
            
            //"From" object
            params.FY = params.FY || { };
            params.FM = params.FM || { };
            params.FD = params.FD || { };
            
            //"To" object
            params.TY = params.TY || { };
            params.TM = params.TM || { };
            params.TD = params.TD || { };
            
            params.FY.listeners = params.FY.listeners || { };
            params.FM.listeners = params.FM.listeners || { };
            params.FD.listeners = params.FD.listeners || { };
            
            params.TY.listeners = params.TY.listeners || { };
            params.TM.listeners = params.TM.listeners || { };
            params.TD.listeners = params.TD.listeners || { };
            
            var selectMirror = function(part){
                return function(obj){
                    setTimeout(function(){
                        Ext.getCmp(controller.id + '-' + params.id + '-cboTo' + part).setValue(obj.getValue()); //All
                    }, 100);
                };
            };
            
            //FROM
            //===========================================================
            
            //From year
            if(!params.FY.listeners.hasOwnProperty('afterrender')){
                params.FY.listeners.afterrender = function(obj) {
                    obj.setValue(params.FY.value || new Date().getFullYear()); //All
                };
            }
            
            if(!params.FY.listeners.hasOwnProperty('change')){
                params.FY.listeners.change = params.FY.listeners.change || selectMirror('Y');
            }
            
            //From month
            if(!params.FM.listeners.hasOwnProperty('afterrender')){
                params.FM.listeners.afterrender = function(obj) {
                    var curMonth = '';
                    
                    if(params.FM.hasOwnProperty('value')){
                        curMonth = params.FM.value;
                    }else{
                        var curMonth = (new Date().getMonth() + 1).toString();
                        curMonth = curMonth.length === 1 ? '0' + curMonth : curMonth;
                    }

                    obj.setValue(curMonth); //All
                };
            }
            
            if(!params.FM.listeners.hasOwnProperty('change')){
                params.FM.listeners.change = params.FM.listeners.change || selectMirror('M');
            }
            
            //From date
            if(!params.FD.listeners.hasOwnProperty('afterrender')){
                params.FD.listeners.afterrender = function(obj) {
                     obj.setValue(params.FD.value || ''); //All
                };
            }
            
            if(!params.FD.listeners.hasOwnProperty('change')){
                params.FD.listeners.change = params.FD.listeners.change || selectMirror('D');
            }
            //TO
            //===========================================================
            
            //To year
            if(!params.TY.listeners.hasOwnProperty('afterrender')){
                params.TY.listeners.afterrender = function(obj) {
                    obj.setValue(params.TY.value || new Date().getFullYear()); //All
                };
            }
            
            //To month
            if(!params.TM.listeners.hasOwnProperty('afterrender')){
                params.TM.listeners.afterrender = function(obj) {
                    var curMonth = '';

                    if(params.TM.hasOwnProperty('value')){
                        curMonth = params.TM.value;
                    }else{
                        var curMonth = (new Date().getMonth() + 1).toString();
                    }
                    
                    curMonth = curMonth.length === 1 ? '0' + curMonth : curMonth;

                    obj.setValue(curMonth); //All
                };
            }
            
            //To date
            if(!params.TD.listeners.hasOwnProperty('afterrender')){
                params.TD.listeners.afterrender = function(obj) {
                     obj.setValue(params.TD.value || ''); //All
                };
            }
            
            var items = [ ];
            
            var width = 5;
            width += 120;
            
            items.push({
                width: 120,
                border:false,
                padding:top + 'px 2px 0px '+ (params.FY.L || '0')+'px',  bodyStyle: 'background: transparent',
                items:[
                    {
                        xtype:'combo',
                        fieldLabel: '<strong style="color:#000;">From</strong>',
                        id: controller.id + '-' + params.id + '-cboFromY',
                        store: aniosStore,
                        labelAlign:'right',
                        queryMode: 'local',
                        triggerAction: 'all',
                        autoSelect: false,
                        enableKeyEvents: true,
                        editable: params.hasOwnProperty('editable') ? params.editable : true,
                        caseSensitive: true,
                        valueField: 'code',
                        displayField: 'name',
                        emptyText: this.emptyText,
                        labelWidth: 50,
                        width:'100%',
                        anchor:'100%',
                        listeners: params.FY.listeners
                    }
                ]
            });
            
            if(params.level > 1){
                items.push({
                    width: 60,
                    border:false,
                    padding:defPadding,  bodyStyle: 'background: transparent',
                    items:[
                        {
                            xtype:'combo',
                            fieldLabel: '',
                            id: controller.id + '-' + params.id + '-cboFromM',
                            store: mesesStore,
                            labelAlign:'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            editable: params.hasOwnProperty('editable') ? params.editable : true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: pxutils.emptyText,
                            labelWidth: 0,
                            width:'100%',
                            anchor:'100%',
                            listeners: params.FM.listeners
                        }      
                    ]
                });
                width += 60;
            };
            
            if(params.level > 2){
                items.push({
                    width: 60,
                    border:false,
                    padding:defPadding,  bodyStyle: 'background: transparent',
                    items:[
                        {
                            xtype:'combo',
                            fieldLabel: '',
                            id: controller.id + '-' + params.id + '-cboFromD',
                            store: diasStore,
                            labelAlign:'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            editable: params.hasOwnProperty('editable') ? params.editable : true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: pxutils.emptyText,
                            labelWidth: 0,
                            width:'100%',
                            anchor:'100%',
                            listeners: params.FD.listeners
                        }      
                    ]
                });
                width += 60;
            }
            
            if(!onlyFrom){

                width += 120;

                items.push({
                    width: 105,
                    border:false,
                    padding:top + 'px 2px 0px '+ (params.TY.L || '0')+'px',  bodyStyle: 'background: transparent',
                    items:[
                        {
                            xtype:'combo',
                            fieldLabel: '<strong style="color:#000;"> To</strong>',
                            id: controller.id + '-' + params.id + '-cboToY',
                            store: aniosStore,
                            labelAlign:'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            editable: params.hasOwnProperty('editable') ? params.editable : true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: pxutils.emptyText,
                            labelWidth: 30,
                            width:'100%',
                            anchor:'100%',
                            listeners: params.TY.listeners
                        }
                    ]
                });

                if(params.level > 1){
                    items.push({
                        width: 60,
                        border:false,
                        padding:defPadding,  bodyStyle: 'background: transparent',
                        items:[
                            {
                                xtype:'combo',
                                fieldLabel: '',
                                id: controller.id + '-' + params.id + '-cboToM',
                                store: mesesStore,
                                labelAlign:'right',
                                queryMode: 'local',
                                triggerAction: 'all',
                                autoSelect: false,
                                enableKeyEvents: true,
                                editable: params.hasOwnProperty('editable') ? params.editable : true,
                                caseSensitive: true,
                                valueField: 'code',
                                displayField: 'name',
                                emptyText: pxutils.emptyText,
                                labelWidth: 0,
                                width:'100%',
                                anchor:'100%',
                                listeners: params.TM.listeners
                            }      
                        ]
                    });
                    width += 60;
                }

                if(params.level > 2){
                    items.push({
                        width: 60,
                        border:false,
                        padding:defPadding,  bodyStyle: 'background: transparent',
                        items:[
                            {
                                xtype:'combo',
                                fieldLabel: '',
                                id: controller.id + '-' + params.id + '-cboToD',
                                store: diasStore,
                                labelAlign:'right',
                                queryMode: 'local',
                                triggerAction: 'all',
                                autoSelect: false,
                                enableKeyEvents: true,
                                editable: params.hasOwnProperty('editable') ? params.editable : true,
                                caseSensitive: true,
                                valueField: 'code',
                                displayField: 'name',
                                emptyText: pxutils.emptyText,
                                labelWidth: 0,
                                width:'100%',
                                anchor:'100%',
                                listeners: params.TD.listeners
                            }      
                        ]
                    });
                    width += 60;
                }
            }
            
            var getDate = function(prefix, bound){
                bound = bound || '00';
                
                var M = '', D = '';
                
                var Y = Ext.getCmp(controller.id + '-' + params.id + '-cbo' + prefix + 'Y').getValue();
                
                if(params.level>1){
                    M = Ext.getCmp(controller.id + '-' + params.id + '-cbo' + prefix + 'M').getValue();
                    if(M.toString().length === 1) M = '0' + M.toString();
                    M = M === '' ? bound : M;
                }
                
                if(params.level>2){
                    D = Ext.getCmp(controller.id + '-' + params.id + '-cbo' + prefix + 'D').getValue();
                    if(D.toString().length === 1) D = '0' + D.toString();
                    D = D === '' ? bound : D;
                }
                
                return Y.toString() + M.toString() + D.toString();
            };
            
            var clearDate = function(prefix){
                var Y = prefix === 'From' ? params.FY : params.TY;
                var M = prefix === 'From' ? params.FM : params.TM;
                var D = prefix === 'From' ? params.FD : params.TD;
                
                var DATE = { Y: Y, M: M, D:D };
                
                Ext.getCmp(controller.id + '-' + params.id + '-cbo' + prefix + 'Y').setValue(DATE.Y.value || new Date().getFullYear());
                
                if(params.level>1){
                    var curMonth = '';

                    if(DATE.M.hasOwnProperty('value')){
                        curMonth = DATE.M.value;
                    }else{
                        var curMonth = (new Date().getMonth() + 1).toString();
                    }
                    
                    curMonth = curMonth.length === 1 ? '0' + curMonth : curMonth;
                    
                    Ext.getCmp(controller.id + '-' + params.id + '-cbo' + prefix + 'M').setValue(curMonth);
                }
                
                if(params.level>2){
                    Ext.getCmp(controller.id + '-' + params.id + '-cbo' + prefix + 'D').setValue(DATE.D.value || '');
                }
            };
            
            var bHidden = params.hasOwnProperty('hidden') ? params.hidden : false;
            
            return {
                html: {
                    id: controller.id + '-' + params.id + '-panel',
                    xtype: 'panel',
                    items: items,
                    width: width,
                    bodyStyle: 'background: transparent',
                    layout: 'column',
                    height:35,
                    hidden: bHidden,
                    border:false
                },
                getFromDate: function(){
                    return getDate('From');
                },
                getToDate: function(){
                    return getDate('To', '99');
                },
                clearFromDate: function(){
                    return clearDate('From');
                },
                clearToDate: function(){
                    return clearDate('To');
                },
                show: function(){
                    Ext.getCmp(controller.id + '-' + params.id + '-panel').setVisible(true);
                },
                hide: function(){
                    Ext.getCmp(controller.id + '-' + params.id + '-panel').setVisible(false);
                }
            };
        },
        getButton: function(params){
            params.label = params.label || { };

            var listeners = {
                afterrender: function(obj) {
                    
                }
            };
            
            var padding = (params.top || '0') + 'px '+ (params.right || '0')+'px '+ (params.bottom || '0')+'px '+ (params.left || '0')+'px';
            
            var metods = {
                xtype:'button',
                id: controller.id + params.id,     
                text: params.text,
                height: '100%',
                width: '100%', 
                style: params.style || '',
                cls: params.cls || '',
                listeners: params.listeners || listeners,
                hidden : params.hasOwnProperty('hidden') ? params.hidden : false
            };
            
            if(params.width) metods.width = params.width;
            if(params.icon) metods.icon = params.icon;
            if(params.scale) metods.scale = params.scale; //'medium' , 'large'
            
            return {
                width: params.width,
                height: params.height,
                border:false,
                padding: padding,
                bodyStyle: 'background: transparent',
                items: [ metods ]
            };
        },
        getTextArea: function(params){
            params.label = params.label || { };

            var listeners = {
                afterrender: function(obj) {
                    obj.setValue('');
                }
            };

            var padding = (params.top || '0') + 'px '+ (params.right || '0')+'px '+ (params.bottom || '0')+'px '+ (params.left || '0')+'px';
            
            var metods = {
                        xtype:'textareafield',
                        id: controller.id + params.id,
                        padding: padding,
                        fieldLabel: params.label.text ? filters.getControlLabel(params.label.text || '', params.label.style || '') : '',
                        labelAlign:params.label.align || 'left',
                        labelWidth: params.label.width || 0,
                        grow      : true,
                        border: false,
                        width: params.width,
                        //anchor:'100%',
                        height:params.height,
                        editable: params.hasOwnProperty('editable') ? params.editable : true,
                        readOnly: params.hasOwnProperty('readOnly') ? params.readOnly : false,
                        hidden : params.hasOwnProperty('hidden') ? params.hidden : false,                  
                        style: params.style || '',
                        listeners: params.listeners || listeners
                    };    
            
            if(params.hasOwnProperty('maxLength')) metods.maxLength = params.maxLength;
            if(params.hasOwnProperty('enforceMaxLength')) metods.enforceMaxLength = params.enforceMaxLength;
            if(params.hasOwnProperty('maskRe')) metods.maskRe = params.maskRe;

            return metods;
        },
        getImage: function(params){
        
            var listeners = {
                afterrender: function(obj) {
                    
                }
            };
            
            var metods = {
                        xtype: 'image',
                        id: controller.id + params.id,
                        src: params.src,
                        region: 'south',
                        width: params.width,
                        height: params.height,
                        hidden : params.hasOwnProperty('hidden') ? params.hidden : false,
                        listeners: params.listeners || listeners
                    };
                    
            if(params.hasOwnProperty('style')) metods.style = params.style;   
            
            return metods;
        },
        getTextBox2: function(params){
            params.label = params.label || { };

            var listeners = {
                afterrender: function(obj) {
                    obj.setValue('');
                }
            };

            var padding = (params.top || '0') + 'px '+ (params.right || '0')+'px '+ (params.bottom || '0')+'px '+ (params.left || '0')+'px';

            var metods = {
                        xtype:'textfield',
                        id: controller.id + params.id,
                        padding: padding,
                        fieldLabel: params.label.text ? filters.getControlLabel(params.label.text || '', params.label.style || '') : '',
                        labelAlign:params.label.align || 'left',
                        labelWidth: params.label.width || 0,
                        width: params.width,
                        anchor:'100%',
                        editable: params.hasOwnProperty('editable') ? params.editable : true,
                        readOnly: params.hasOwnProperty('readOnly') ? params.readOnly : false,
                        hidden : params.hasOwnProperty('hidden') ? params.hidden : false,                  
                        listeners: params.listeners || listeners
                    };    
            
            if(params.hasOwnProperty('maxLength')) metods.maxLength = params.maxLength;
            if(params.hasOwnProperty('enforceMaxLength')) metods.enforceMaxLength = params.enforceMaxLength;
            if(params.hasOwnProperty('maskRe')) metods.maskRe = params.maskRe;
            if(params.hasOwnProperty('style')) metods.fieldStyle = params.style;

            return metods;
            /*return {
                width: params.width,
                border:false,
                padding: padding,
                bodyStyle: 'background: transparent',
                layout: 'column',
                items: [ metods ]
            };*/
        },
        getTextDate : function(params){
            params.label = params.label || { };
            
            var listeners = {
                afterrender: function(obj) {
                    obj.setValue('');
                },
                blur : function(obj){
                    var date = $('#' + obj.id + '-inputEl');
                    if(date.val()=== ''){
                        Ext.getCmp(obj.id).setValue('');
                    }
                    return false;
                }        
            };

            var padding = (params.top || '0') + 'px '+ (params.right || '0')+'px '+ (params.bottom || '0')+'px '+ (params.left || '0')+'px';
            
            var metods = {
                xtype: 'datefield',
                id: controller.id + params.id,
                labelWidth: params.label.width || 0,
                format:'Y/m/d',
                labelAlign:params.label.align || 'left',
                fieldLabel: params.label.text ? filters.getControlLabel(params.label.text || '', params.label.style || '') : '',
                width:'100%',
                anchor:'100%',
                listeners : params.listeners || listeners
            };
            
            if(params.hasOwnProperty('style')) metods.fieldStyle = params.style;
            
            return {
                width: params.width,
                border:false,
                padding: padding,
                bodyStyle: 'background: transparent',
                layout: 'column',
                items: [ metods ]
            };
        },
        getPanelSlide: function(items, params){
            params = params || { };
            var itemsSlide = [];
            
            if(items.itemWest){
                itemsSlide.push({
                    id : controller.id + (items.itemWest.id || '-slideWest'),
                    title: items.itemWest.title || '',
                    region:'west',
                    floatable: false,
                    margin: '0 0 0 0',
                    width: items.itemWest.width,//500,
                    minWidth: items.itemWest.minWidth,//2,
                    maxWidth: items.itemWest.maxWidth,//500,
                    bodyStyle: items.itemWest.style || '',
                    items: items.itemWest.items
                });
            }
            
            if(items.itemMain){
                itemsSlide.push({
                    id : controller.id + (items.itemWest.id || '-slideMain'),
                    title: items.itemMain.title || '',
                    collapsible: false,
                    region: 'center',
                    margin: '0 0 0 0',
                    bodyStyle: items.itemMain.style || '',
                    items: items.itemMain.items,
                    scrollable: true
                });
            }
            
            if(items.itemFooter){
                itemsSlide.push({
                    id : controller.id + (items.itemWest.id || '-slideFooter'),
                    title: items.itemFooter.title || '',
                    region: 'south',
                    height: items.itemFooter.height,//100,
                    minHeight: items.itemFooter.minHeight,//75,
                    maxHeight: items.itemFooter.maxHeight,//150,
                    items: items.itemFooter.items
                });
            }            
            
            var obj = {
                xtype: 'panel',
                region:'center',
                border: params.hasOwnProperty('border') ? params.border : false,
                bodyStyle: 'background: transparent',
                layout:'border',
                requires: [
                    'Ext.layout.container.Border'
                ],                                        
                defaults: {
                    collapsible: params.hasOwnProperty('collapsible') ? params.collapsible : false,
                    split: params.hasOwnProperty('split') ? params.split : true,
                    bodyPadding: params.hasOwnProperty('bodyPadding') ? params.bodyPadding : 5
                },
                items: itemsSlide
            };
            
            if(params.cls)obj.cls = params.cls;
            if(params.style)obj.style = params.style;
            if(params.width)obj.width = params.width;                        
            if(params.id)obj.id = controller.id + params.id;                        
            if(params.height) obj.height = params.height;
            if(params.visible) obj.visible = params.visible;
            if(params.hidden) obj.hidden = params.hidden;
            
            return obj;
        },
        getDataView : function(params){
            var padding = (params.top || '0') + 'px '+ (params.right || '0')+'px '+ (params.bottom || '0')+'px '+ (params.left || '0')+'px';
            
            var dataview = Ext.create('Ext.DataView', {
                id : controller.id + (params.id || '-'+ defaults.layout.dataView.id),
                fullscreen: params.fullscreen || true,
                store: params.store,
                itemTpl: params.itemTpl,
                padding: padding,
                width: params.width,
                height:params.height,
                style: params.style || '',
                cls: params.cls || '',
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                }
            });
            
            return dataview;
        }        
    };
    
    this.getRenderer = function(params){
        var html = '#';
        params.format = params.format || '';
        params.decimals = params.decimals || '00';
        
        if(params.style){
            html = '<label style="' + params.style + '">#</label>';
        }
        
        var format = null;
        
        switch(params.format){
            case 'N': format = '0,000'; break;
            case 'F': format = '0,000.' + params.decimals; break;
            case 'P': format = '0,000.' + params.decimals + '%'; break;
            default : format = ''; break;
        };
        
        return function(value, metaData, record, rowIndex, colIndex){
            if(params.metaData){
                metaData.style = params.metaData;
            };
            
            value = format !== '' ? Ext.util.Format.number(value, format) : value;
            var ret = html.replace('#', value);
            return ret;
        };
    };
    
    this.formatDblNumber = function(value){
        return Ext.util.Format.number(value, '0,000.00');
    };
    
    var _formatLngNumber = function(value){
        return Ext.util.Format.number(value, '0,000');
    };
    
    //hacer drill down
    this.doDrillDown = function(i, fromGrid, toGrid) {
        var obj = {};
        
        if(i>=0){
            var gridData = Ext.getCmp(controller.id + '-' + fromGrid);
            var st = gridData.getStore();
            if(st === null || st === undefined) return false;
            obj = st.data.items[i].data;
        }else{
            obj = controller.drillDown.params;
        }
        
        var store = Ext.getCmp(controller.id + '-' + toGrid).getStore();
        
        store.currentPage = 1;
        store.removeAll();
        store.load({ params: obj });
        controller.drillDown.params = obj;

        _this.getDrillDown(toGrid);
    };
    
    this.setVisibleDrillDownSet = function(back){
        var g, m = controller.grids.length;
        
        for(g=0; g<m; g++){
            var gridId = controller.grids[g].role === 'grid' ? controller.grids[g].items[1].id.replace(controller.id + '-', '') : controller.grids[g].id.replace(controller.id + '-', '');
            _this.setVisibleGrid(gridId,false);
        }
        
        var toGrids = controller.drillDownSet.current;
        var x, n;
        
        if(back){    
            n = toGrids.length;
            
            for(x=0; x<n; x++){
                var toGrid = toGrids[x];
                _this.setVisibleGrid(toGrid, true);
            }
        }else{
            var mainGrid = getCurrentVisibleGrid(controller.drillDownSet.current[0]);
            var parents = mainGrid.parents;
            
            n = parents.length;
            
            if(n === 0){
                inicio.home();
            }else{
                for(x=0; x<n; x++){
                    var toGrid = parents[x];
                    _this.setVisibleGrid(toGrid, true);
                }
            }
            
            controller.drillDownSet.current = parents;
        }
    };
    
    //hacer drill down multiple
    this.doMultiDrillDown = function(i, fromGrid, callBack) {
        var toGrids = controller.drillDownSet.current || [ ];
        var x, n = toGrids.length;
        
        var gridData = Ext.getCmp(controller.id + '-' + fromGrid);
        var st = gridData.getStore();

        var obj = {};
        if(st === null || st === undefined) return false;

        var obj = st.data.items[i].data;

        for(x=0; x<n; x++){
            var toGrid = toGrids[x];
            
            var element = Ext.getCmp(controller.id + '-' + toGrid);
            //element = element || Ext.getCmp(toGrid);
            if(element.store){
                var store = element.getStore();

                store.currentPage = 1;
                store.removeAll();
                store.load({ params: obj });

                if(x === 0) controller.drillDownSet.params = obj;
            }
        }
        
        if(callBack) callBack(i);
        
        _this.setVisibleDrillDownSet(true);
    };
    
    this.fixDateZeros = function(s){
        return s.toString().trim().length === 1 ? '0' + s : s;
    };
    
    this.fillZeros = function(n, s){
        var c = s.length;
        
        if(c < n && s.length > 0){
            var i, diff = n - c;
            
            for ( i=0; i<diff; ++i){
                s = '0' + s;
            }
        }
        
        return s;
    };
    
    this.formatLngNumber = _formatLngNumber;
    
    var _getSelectedIndex = function(idcombo){
        var combo = Ext.getCmp(controller.id + idcombo);
        var value = combo.getValue();
        var record = combo.findRecordByValue(value);
        var index = combo.getStore().indexOf(record);
        
        return index;
    };
    
    this.getSelectedIndex = _getSelectedIndex;
};