Ext.define('Ext.Praxis.controller.sales.CloneScheme.CloneSchemeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CloneSchemeController',
    me: '',
    setContext: function() {
        me = this;
    },
    init: function(view) {
        me = this;
//        prototype.id = 'CloneSchemeForm';
//        prototype.url = CONTEXTPATH+'/CloneScheme';
    },
    afterRender: function () {
        this.btnSearch_click();
    },
    onCmbOpcionChange: function(cmp, newValue) {
        this.setValue('txtCode', '');
        this.setValue('txtFechaOpen', '');
        this.setValue('cmbStatus', '');
        switch (newValue) {
            case 'C':
                Ext.getCmp(prototype.id+'-txtCode').show();
                Ext.getCmp(prototype.id+'-txtFechaOpen').hide();
                Ext.getCmp(prototype.id+'-lblStatus').hide();
                Ext.getCmp(prototype.id+'-cmbStatus').hide();
                this.focus('txtCode');
                break;
            case 'E':case 'S':default:
                Ext.getCmp(prototype.id+'-txtCode').hide();
                Ext.getCmp(prototype.id+'-txtFechaOpen').show();
                this.setValue('txtFechaOpen', new Date());
                Ext.getCmp(prototype.id+'-lblStatus').show();
                Ext.getCmp(prototype.id+'-cmbStatus').show();
                this.focus('txtFechaOpen');
                break;
        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    setFillData: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.setValue('TXT_SELECT_CODE', data.A1155CODAC);
        this.setValue('TXT_SELECT_VERSION', data.A1155VRSAC);
        this.setValue('TXT_SELECT_TYPE', data.A1155INDAC);
        this.setValue('TXT_COPY_TYPE', data.A1155INDAC);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        var cmbOpcion = this.getValue('cmbOpcion');
        var txtFechaOpen = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtFechaOpen').getValue(), 'Ymd');
        switch (cmbOpcion) {
            case 'C':
                if (this.getValue('txtCode')==='') {
                    global.Msg({ msg: 'Enter the required fields.' });
                    return false;
                }
                break;
            case 'E': case 'S': default:
                if (txtFechaOpen==='') {
                    global.Msg({ msg: 'Enter the required fields.' });
                    return false;
                } else {
                    var errors = Ext.getCmp(prototype.id+'-txtFechaOpen').getErrors();
                    errors.forEach(function callback(currentValue, index, array) {
                        global.Msg({ msg: currentValue });
                    });
                    if (errors.length > 0) {
                        this.focus('txtFechaOpen');
                        return false;
                    }
                }
                break;
        }
        // <editor-fold defaultstate="collapsed" desc="asignación">
        var bean = {};
        bean.A1155AIRLI="139";
//	bean.A1155INDAC='U';
	bean.A1155CODAC='';
	bean.A1155FINI='';
	bean.A1155FESTA='';
	bean.A1155FINGR='';
        bean.A1155INDAC=this.getValue('cmbTypeCommission');
        switch (cmbOpcion) {
            case 'C':
                bean.A1155CODAC=this.getValue('txtCode');
                break;
            case 'E':
                bean.A1155FINI=txtFechaOpen;
                bean.A1155FESTA=this.getValue('cmbStatus');
                break;
            case 'S':
                bean.A1155FINGR=txtFechaOpen;
                bean.A1155FESTA=this.getValue('cmbStatus');
                break;
        }
        // </editor-fold>
        this.search(bean);
    },
    setCloneCommission: function() {
        var SELECT_CODE=this.getValue('TXT_SELECT_CODE');
	var SELECT_VERSION=this.getValue('TXT_SELECT_VERSION');
	var SELECT_TYPE=this.getValue('TXT_SELECT_TYPE');
	var COPY_CODE=this.getValue('TXT_COPY_CODE');
	var COPY_VERSION=this.getValue('TXT_COPY_VERSION');
	var COPY_TYPE=this.getValue('TXT_COPY_TYPE');
	var COPY_INFO=this.getValue('CHK_INFO')?1:0;
	var COPY_GLOBAL=this.getValue('CHK_GLOBAL')?1:0;
	var COPY_SECTOR=this.getValue('CHK_SECTOR')?1:0;
	var COPY_AX_TABLE=this.getValue('CHK_AX_TABLE')?1:0;
        if (SELECT_CODE.trim()==='') {
            global.Msg({ msg: 'Click Item Grid to Copy.' });
            return false;
        }
        if (COPY_CODE.trim()==='') {
            global.Msg({ msg: 'Enter Code to Copy.' });
            this.focus('TXT_COPY_CODE');
            return false;
        }
        if (COPY_VERSION.trim()==='') {
            global.Msg({ msg: 'Enter Version to Copy.' });
            this.focus('TXT_COPY_VERSION');
            return false;
        }
        var bean = {};
        bean.A1155AIRLI="139";
	bean.IN_SELET_CODE='';
	bean.IN_SELET_SERIE='';
	bean.IN_SELET_TYPE='';
	bean.IN_COPY_CODE='';
	bean.IN_COPY_SERIE='';
	bean.IN_COPY_TYPE='';
	
	bean.IN_SELET_CODE=SELECT_CODE;
	bean.IN_SELET_SERIE=SELECT_VERSION;
	bean.IN_SELET_TYPE=SELECT_TYPE;
	bean.IN_COPY_CODE=COPY_CODE;
	bean.IN_COPY_SERIE=COPY_VERSION;
	bean.IN_COPY_TYPE=COPY_TYPE;
	
	bean.IN_COPY_INFO=COPY_INFO;
	bean.IN_COPY_GLOBAL=COPY_GLOBAL;
	bean.IN_COPY_SECTOR=COPY_SECTOR;
	bean.IN_COPY_AX_TABLE=COPY_AX_TABLE;
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to copy?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.setSaveClone(bean);
                }
            }
        });
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            global.showMenu();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    search: function(bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.CloneScheme.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1155");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id+'-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridAgremment').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setSaveClone">
    setSaveClone: function(bean) {
        Ext.Ajax.request({
            url: prototype.url+'/setSaveClone',
            method: 'POST',
            timeout: 60000000,
            params: bean,
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstArray = res.response;
                    var objA1155 = lstArray[0];
                    global.Msg({
                        msg: objA1155.OU_MESSAGE,
                        fn: function(btn) {
                            if (btn === 'ok') {
                                if (Number(objA1155.OU_SQLCODE)===0) {
                                    me.clearDataFront();
                                }
                            }
                        }
                    });
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // </editor-fold>

    clearDataFront: function() {
        this.setValue('TXT_SELECT_CODE', '');
        this.setValue('TXT_SELECT_VERSION', '');
        this.setValue('TXT_SELECT_TYPE', 'U');
        this.setValue('TXT_COPY_CODE', '');
        this.setValue('TXT_COPY_VERSION', '');
        this.setValue('TXT_COPY_TYPE', 'U');
        this.setValue('CHK_INFO', true);
        this.setValue('CHK_GLOBAL', true);
        this.setValue('CHK_SECTOR', true);
        this.setValue('CHK_AX_TABLE', true);
    },
    PadCode: function() {
        var TXT_COPY_CODE = this.getValue('TXT_COPY_CODE');
        if (TXT_COPY_CODE!=='') this.setValue('TXT_COPY_CODE', this.pad(TXT_COPY_CODE, 6));
    },
    PadVersion: function() {
        var TXT_COPY_VERSION = this.getValue('TXT_COPY_VERSION');
        if (TXT_COPY_VERSION!=='') this.setValue('TXT_COPY_VERSION', this.pad(TXT_COPY_VERSION, 3));
    },
    pad: function(value,fill) {
        var n = value.trim();
        var max = Number(fill)-n.length;
        for (var i = 0; i < max; i++) {
            n = "0" + n;
        }
        return n;
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveLast();
        }
    },
    // </editor-fold>
    
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
