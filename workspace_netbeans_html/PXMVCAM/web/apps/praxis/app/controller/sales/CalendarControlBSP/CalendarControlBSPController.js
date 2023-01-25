Ext.define('Ext.Praxis.controller.sales.CalendarControlBSP.CalendarControlBSPController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CalendarControlBSPController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    _path: '',
    bean: {},
    beanExcel: {},
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'CalendarControlBSPForm';
        prototype.url = CONTEXTPATH+'/CalendarControlBSP';
        prototype.widthContenedor = 1100;
        // </editor-fold>
    },
    afterRender: function () {
        this.setValue('txtFilterDate', Ext.Date.format(new Date(), 'Y'));
        this.setValue('txtFilterCountry', '');
        this.focus('txtFilterCountry');
        this.btnSearch_click();
    },
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.bean.IN_A1529ISOC = this.getValue("txtFilterCountry");
        this.bean.IN_A1529BAED = this.getValue("txtFilterDate");
        this.beanExcel.IN_A1529ISOC = this.bean.IN_A1529ISOC;
        this.beanExcel.IN_A1529BAED = this.bean.IN_A1529BAED;
        this._path = prototype.url+'/getXLSX?' +
            'IN_A1529ISOC='+this.beanExcel.IN_A1529ISOC+'&' +
            'IN_A1529BAED='+this.beanExcel.IN_A1529BAED;
        this.search(this.bean);
    },
    btnFilter_click: function() {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) option.hide();
        else option.show();
    },
    btnExcel_click: function(obj, e) {
        
        var param ={
            IN_A1529ISOC: Ext.getCmp(prototype.id+'-txtFilterCountry').getValue(),
            IN_A1529ANIO: Ext.getCmp(prototype.id+'-txtFilterDate').getValue()
        };
        if ( param.IN_A1529ISOC === '' ){
            alert('Enter Country Iso Code');
            return;
        }
        if ( param.IN_A1529ANIO === '' ){
            alert('Enter Year');
            return;
        }        
        this.exportExcel('/getXLSX?beanString=' + encodeURI(JSON.stringify(param)));        
    },
    btnClear_click: function(obj, e) {
        this.setValue('txtFilterCountry', '');
        this.setValue('txtFilterDate', '');
        if(Ext.getCmp(prototype.id + '-txtFilterCountry').isVisible()) this.focus('txtFilterCountry');
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
                win.lblUser_toolTip("Estructura: A1529");
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res.oList);
                var data = res.data;
                var panel = Ext.getCmp(prototype.id + '-contenedor-calendario');
                var calendar = Ext.create('MtCalendar',{
                    fuente:'BSP',
                    year:bean.IN_A1529BAED,
                    country:res.oList===undefined?'':res.oList[0].A006NOMBRE,
                    items: data,
                    listeners:{
                        onItemCalendarClick: function(qtr, month, week, op, comm, cant, error, cantsale, text){
                            window.alert("Hi");
//                            if(parseInt(text) <= parseInt(Ext.Date.format(new Date(), 'Ymd')) && cant == 0){
//                                me.getRegularization(bean.IN_A1529BAED,week,text);
//                            }
                        }
                    }
                });
                panel.removeAll();
                panel.add(calendar);
                Ext.getCmp(prototype.id + '-contenedor-calendario').unmask();
            },
            failure: function(response, opts) {
                //console.log('server-side failure with status code '+response.status);
                Ext.getCmp(prototype.id + '-contenedor-calendario').unmask();
            }
        });
    },
    exportExcel: function(_path) {
//        if(this._path.length > 0)
//        global.getFile(this._path);
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    global.getFile(prototype.url + _path);
                }
            }
        });
    
    },
    
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
