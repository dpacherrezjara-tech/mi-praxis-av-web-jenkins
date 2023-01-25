Ext.define('Ext.Praxis.controller.sales.CalendarControlASR.CalendarControlASRController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CalendarControlASRController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    //_path: '',
    bean: {},
    beanExcel: {},
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'CalendarControlASRForm';
        prototype.url = CONTEXTPATH+'/CalendarControlASR';
        prototype.widthContenedor = 1100;
        // </editor-fold>
    },
    afterRender: function () {
        //console.log(prototype.url);
        this.setValue('txtFilterDate', Ext.Date.format(new Date(), 'Y'));
        this.btnSearch_click();
    },
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.bean.IN_A1528FPRO = this.getValue("txtFilterDate");
        this.beanExcel.IN_A1528FPRO = this.bean.IN_A1528FPRO;
        //this._path = prototype.url+'/getXLSX?IN_A1528FPRO='+this.beanExcel.IN_A1528FPRO;
        this.search(this.bean);
    },
    btnFilter_click: function() {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) option.hide();
        else option.show();
    },
    btnExcel_click: function(obj, e) {
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    //this.exportExcel();
                    global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(this.beanExcel)));
                }
            }
        });
    },
    btnClear_click: function(obj, e) {
        this.setValue('txtFilterDate', '');
        if(Ext.getCmp(prototype.id + '-txtFilterDate').isVisible()) this.focus('txtFilterDate');
    },
    btnBack_click: function() {
        global.showMenu();
    },
    // </editor-fold>
    
    search: function(bean) {
        Ext.Ajax.request({
            url: prototype.url + '/search',
            params: bean,
            beforerequest: Ext.getCmp(prototype.id + '-contenedor-calendario').mask('Loading...'),
            success: function(response, options) {
                win.lblUser_toolTip("Estructura: A1528");
                var res = Ext.JSON.decode(response.responseText);
                res = res.data;
                var panel = Ext.getCmp(prototype.id + '-contenedor-calendario');
                var calendar = Ext.create('MtCalendar',{
                    fuente:'ASR',
                    year:bean.IN_A1528FPRO,
                    items: res,
                    listeners:{
                        onItemCalendarClick: function(qtr, month, week, op, comm, cant, error, cantsale, text){
                            if(parseInt(text) <= parseInt(Ext.Date.format(new Date(), 'Ymd')) && cant == 0){
                                me.getRegularization(bean.IN_A1528FPRO,week,text);
                            }
                        }
                    }
                });
                panel.removeAll();
                panel.add(calendar);
                Ext.getCmp(prototype.id + '-contenedor-calendario').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp(prototype.id + '-contenedor-calendario').unmask();
            }
        });
    },
    //<editor-fold defaultstate="collapsed" desc="getRegularization">
    getRegularization: function(year,week,fecha) {
        var winRegularization = Ext.create('Ext.window.Window', {
            id: prototype.id + '-win-regularization',
            title: 'ASR - ' + fecha,
            header: true,
            height: 150,
            width: 470,
            border: false,
            resizable: false,
            margin: 10,
            layout:'fit',
            modal: true,
            items: [
                {
                    region: 'center',
                    id: prototype.id + '-center',
                    bodyStyle: 'background: transparent',
                    border: false,
                    padding: '5px 5px 5px 5px',
                    bbar: [
                        ' ',
                        {
                            xtype: 'button',
                            scale: 'medium',
                            iconCls: 'prx-icon-update',
                            border: true,
                            text: 'Update',
                            height: 30,
                            listeners: {
                                beforerender: function(obj, opts) {
                                },
                                click: function(obj, e) {
                                    me.setRegularization(fecha);
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            scale: 'medium',
                            iconCls: 'prx-icon-cancel',
                            border: true,
                            text: 'Cancel',
                            height: 30,
                            listeners: {
                                beforerender: function(obj, opts) {
                                },
                                click: function(obj, e) {
                                    Ext.getCmp(prototype.id + '-win-regularization').close();
                                }
                            }
                        }
                    ],
                    items: [
                        {
                            layout: 'column', border: false,
                            items: [
                                {
                                    columnWidth: 1, border: false,
                                    padding: '0px 5px 0px 0px', bodyStyle: 'background: transparent',
                                    items: [
                                        {
                                            xtype: 'label',
                                            html: '<strong>Reason for Regularize:</strong>'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            layout: 'column', border: false,
                            items: [
                                {
                                    columnWidth: 1, border: false,
                                    padding: '0px 5px 0px 0px', bodyStyle: 'background: transparent',
                                    items: [
                                        {
                                            xtype: 'textarea',
                                            id: prototype.id + '-Reason',
                                            width: '100%',
                                            anchor: '100%'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: function(obj, e) {
                },
                beforeclose: function(panel, e) {
                }
            }
        }).show();
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="setRegularization">
    setRegularization: function(fecha) {
        var IN_A1698COMEN = Ext.getCmp(prototype.id + '-Reason').getValue();
        if (IN_A1698COMEN === '') {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: "You must enter a reason",
                buttons: Ext.MessageBox.OK,
                scope: this,
                icon: Ext.MessageBox.INFO,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok')
                        setTimeout("Ext.getCmp(prototype.id + '-Reason').focus();", 100);
                }
            });
            return;
        }
        var data = {IN_A1528FPRO:'',IN_A1528PDIDC:'',IN_A1528PRDA:fecha,IN_A1698COMEN:IN_A1698COMEN};
        global.Msg({
            msg: 'Want to regularize this date ' + fecha + '?',
            icon: 3,
            buttons: 3,
            fn: function(btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: prototype.url + '/updateObservation',
                        params: data,
                        success: function(response, options) {
                            var res = Ext.decode(response.responseText);
                            Ext.getCmp(prototype.id + '-win-regularization').close();
                            me.search();
                        }
                    });
                }
            }
        });
    },
    //</editor-fold>
    
//    exportExcel: function() {
//        if(this._path.length > 0)
//            global.getFile(this._path);
//    },
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});
