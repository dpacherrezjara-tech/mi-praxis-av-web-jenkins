
Ext.define('Ext.Praxis.controller.sales.DeliveryFileBSP.DeliveryFileBSPController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DeliveryFileBSPController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me: '',
    bean: {},
    lstData: new Array(),
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'DeliveryFileBSPForm';
        prototype.url = CONTEXTPATH+'/DeliveryFileBSP';
        prototype.widthContenedor = 1000;
        // </editor-fold>
        
    },
    afterRender: function () {
        this.setValue('txtCampo2', 'MX');
        this.setValue('txtCampo3', '');
        this.imgSearch_clickHandler();
    },
    imgCmbDate_clickHandler: function() {
        var selectedValue = this.getValue("cmbDate");
        switch (selectedValue) {
            case '1':
                Ext.getCmp(prototype.id + '-op1').show();
                Ext.getCmp(prototype.id + '-op2').hide();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-op1').hide();
                Ext.getCmp(prototype.id + '-op2').show();
                break;
        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        this.bean.IN_OPCION = this.getValue("cmbDate");;
	this.bean.IN_CCUST = '139';
	this.bean.IN_SOURC = 'BSP';
	this.bean.IN_PAIS = this.getValue("txtCampo2");
	this.bean.IN_CITY = this.getValue("txtCampo3");
	this.bean.IN_PRDA = Ext.util.Format.date(this.getValue("txtCampo"), 'Ymd');
	this.bean.IN_TIME = this.getValue("txtCampo4");;
	this.bean.IN_IDFILE = this.getValue("txtCampo5");;
	if(this.bean.IN_OPCION === '1'){
            if(this.bean.IN_PRDA === ''){
                this.focus('txtCampo');
                global.Msg({ msg: 'Enter Processing Date' });
            }else if(this.bean.IN_PAIS === ''){
                this.focus('txtCampo2');
                global.Msg({ msg: 'Enter Country' });
            }/*else if(this.bean.IN_CITY == ''){
                    Alert.show('Enter City');
                    txtCampo3.setFocus();
            }*/else if(this.bean.IN_TIME !== '' && this.bean.IN_TIME.length<4){
                this.focus('txtCampo4');
                global.Msg({ msg: 'Enter Time Valid!' });
            }else{
                this.setValue('txaDelivery', '');
                this.loadSearch(this.bean);
            }
	}else{
            if(this.bean.IN_IDFILE === ''){
                this.focus('txtCampo5');
                global.Msg({ msg: 'Enter IDFILE' });
            }else{
                this.setValue('txaDelivery', '');
                this.loadSearch(this.bean);
            }
	}
    },
    loadSearch: function(bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
            proxy: {
                url: prototype.url + '/loadSearch'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                    Ext.getCmp(prototype.id + '-regionCenterGrid01').mask('Loading...', '');
                },
                load: function(obj) {
                    win.lblUser_toolTip("Estructura: A1348");
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
                    var txtDelivery = Ext.getCmp(prototype.id + '-txaDelivery').getValue();
                    var file = {};
                    if (obj.data.length > 0) {
                        file = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-txtCampo4').setValue(file.TTIME);
                        var lines = obj.data.items;
                        for (var i = 0; i < lines.length; i++) {
                            txtDelivery += lines[i].data.DELIVERY;
                            txtDelivery += '\n';
                        }
                        Ext.getCmp(prototype.id + '-txaDelivery').setValue(txtDelivery);
                    } else {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                    Ext.getCmp(prototype.id + '-regionCenterGrid01').unmask('Loading...', '');
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    imgFilter_clickHandler: function() {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) option.hide();
        else option.show();
    },
    imgTxt_clickHandler: function(obj, e) {
        var beanTXT = {};
        beanTXT.IN_OPCION = this.getValue("cmbDate");
	beanTXT.IN_CCUST = '139';
	beanTXT.IN_SOURC = 'BSP';
	beanTXT.IN_PAIS = this.getValue("txtCampo2");
	beanTXT.IN_CITY = this.getValue("txtCampo3");
	beanTXT.IN_PRDA = Ext.util.Format.date(this.getValue("txtCampo"), 'Ymd');
	beanTXT.IN_TIME = this.getValue("txtCampo4");
	beanTXT.IN_IDFILE = this.getValue("txtCampo5");
        if(beanTXT.IN_OPCION === '1'){
            if(beanTXT.IN_PRDA === ''){
                this.focus('txtCampo');
                global.Msg({ msg: 'Enter Processing Date' });
            }else if(beanTXT.IN_PAIS === ''){
                this.focus('txtCampo2');
                global.Msg({ msg: 'Enter Country' });
            }/*else if(beanTXT.IN_CITY == ''){
                this.focus('txtCampo3');
                global.Msg({ msg: 'Enter City' });
            }*/else if(beanTXT.IN_TIME !== '' && beanTXT.IN_TIME.length<4){
                this.focus('txtCampo4');
                global.Msg({ msg: 'Enter Time Valid!' });
            }else{
                Ext.Msg.show({
                    title: '.:PRAXIS:.',
                    msg: 'The process will take a few minutes',
                    buttons: Ext.MessageBox.OKCANCEL,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function(btn) {
                        if (btn === 'ok') {
                            global.getFile(prototype.url + '/getFileTxt'
                                + '?IN_OPCION=' + beanTXT.IN_OPCION
                                + '&IN_CCUST=' + beanTXT.IN_CCUST
                                + '&IN_SOURC=' + beanTXT.IN_SOURC
                                + '&IN_PAIS=' + beanTXT.IN_PAIS
                                + '&IN_CITY=' + beanTXT.IN_CITY
                                + '&IN_PRDA=' + beanTXT.IN_PRDA
                                + '&IN_TIME=' + beanTXT.IN_TIME
                                + '&IN_IDFILE=' + beanTXT.IN_IDFILE);
                        }
                    }
                });
            }
	}else{
            if(beanTXT.IN_IDFILE === ''){
                this.focus('txtCampo5');
                global.Msg({ msg: 'Enter IDFILE' });
            }else{
                Ext.Msg.show({
                    title: '.:PRAXIS:.',
                    msg: 'The process will take a few minutes',
                    buttons: Ext.MessageBox.OKCANCEL,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function(btn) {
                        if (btn === 'ok') {
                            global.getFile(prototype.url + '/getFileTxt'
                                + '?IN_OPCION=' + beanTXT.IN_OPCION
                                + '&IN_CCUST=' + beanTXT.IN_CCUST
                                + '&IN_SOURC=' + beanTXT.IN_SOURC
                                + '&IN_PAIS=' + beanTXT.IN_PAIS
                                + '&IN_CITY=' + beanTXT.IN_CITY
                                + '&IN_PRDA=' + beanTXT.IN_PRDA
                                + '&IN_TIME=' + beanTXT.IN_TIME
                                + '&IN_IDFILE=' + beanTXT.IN_IDFILE);
                        }
                    }
                });
            }
	}
        //console.log(beanTXT);
    },
    imgClear_clickHandler: function(obj, e) {
        this.setValue('txtCampo', '');
        this.setValue('txtCampo2', '');
        this.setValue('txtCampo3', '');
        this.setValue('txtCampo4', '');
        this.setValue('txaDelivery', '');
    },
    imgBack_clickHandler: function() {
        global.showMenu();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagNext: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin').moveNext();
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
            this.imgSearch_clickHandler();
        }
    }
    // </editor-fold>
});
