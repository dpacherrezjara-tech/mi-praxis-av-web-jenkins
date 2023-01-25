Ext.define('Ext.Praxis.controller.payments.ClarificationFileLink.ClarificationFileLinkController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ClarificationFileLinkController',
    stack: [],
    bean: {},
    beanDetail: {},
    beanCall: {},
    lstTarjetas: {},
    beanProMasterTicket: {},
    beanDetE: {},
    DateControl: '',
    strSTVAL: '',
    NPROG: '',
    _path: '',
    init: function(view) {
        console.log("Init Clarification File LInk");
    },
    afterRender: function() {

        this.setStoreData();
        this.initDate();
        this.obtainData();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    initDate: function() {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('01');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('01');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
    },
    cbxDateFromYear_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue());
    },
    cbxDateFromMonth_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());
    },
    cbxDateFromDay_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue(Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue());
    },
    setStoreData: function() {

        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        var storeComboDataDay = win.getStoreDays(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbFecFiltro').setValue('IATADATE');
        Ext.getCmp(prototype.id + '-cmbBank').setValue('');
    },
    // </editor-fold>



    //<editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {

        var dateFrom = win.getValue('cmbDateFromYear') + win.getValue('cmbDateFromMonth') + win.getValue('cmbDateFromDay');
        var dateTo = win.getValue('cmbDateToYear') + win.getValue('cmbDateToMonth') + win.getValue('cmbDateToDay');
        this.bean.IN_DATE = win.getValue('cmbFecFiltro');
        this.bean.IN_FECHA_FROM = dateFrom;
        this.bean.IN_FECHA_TO = dateTo;
        this.bean.IN_CARDN1 = win.getValue('txtCardF1');
        this.bean.IN_CARDN2 = win.getValue('txtCardF2');
        this.bean.IN_CODEBANK = win.getValue('cmbBank');
        this.bean.IN_COUNTRY = win.getValue('cmbCountry');
        var selectedValue = win.getValue('rbgType').rbgType;
        this.bean.IN_STVAL = selectedValue;
        this.search(this.bean);
    },
    btnClear_click: function(obj, e) {
        this.initDate();
        Ext.getCmp(prototype.id + '-cmbFecFiltro').setValue('IATADATE');
        Ext.getCmp(prototype.id + '-cmbBank').setValue('');
        Ext.getCmp(prototype.id + '-txtCardF1').setValue('');
        Ext.getCmp(prototype.id + '-txtCardF2').setValue('');
        Ext.getCmp(prototype.id + '-rbgType').setValue('PENDING');

    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    btnExcel_click: function(obj, e) {
        this.exportExcel();
    },
    btnBack_click: function(obj, e) {
        if (this.peek() === prototype.id + '-boxMainData') {
            global.showMenu();
        } else {
            this.stack.pop();
            this.selectedChild('vskMain', this.peek().substr(this.peek().indexOf('-') + 1), false);
        }
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="obtainData">
    obtainData: function() {
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify({
                    COUNTRY: 2, BANK: 2
                })},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-cmbCountry').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCountry, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-cmbBank').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstBank, autoLoad: true})
                            );
                    win.setValue('cmbCountry', '');
                    win.setValue('cmbBank', '');
                    me.btnSearch_click();
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>

    search: function(bean) {
        me._path = prototype.url + '/getXLSX?beanString=' + JSON.stringify(bean);
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function(obj, obj2, success, response, obj5) {

                    win.lblUser_toolTip("Estructura: A2331");
                    me.selectedChild('vskMain', 'boxMainData');
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
    },
    onClickDetail: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.selectedChild('vskMain', 'boxDetail');
        me.beanDetail.beanString = JSON.stringify(rowData.data);
        me._path = prototype.url + '/getDetailXLSX?beanString=' + me.beanDetail.beanString;
        this.setGridDataDetail();
    },
    setGridDataDetail: function(data) {
        win.lblUser_toolTip("Estructura: A2331");
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.beanDetail;
                },
                load: function(obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
    },
    onEditClick: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        this.cleanFormulario();
        Ext.getCmp(prototype.id + '-contentOptions').setVisible(false);
        Ext.getCmp(prototype.id + '-contentFilter').setVisible(false);
        me.selectedChild('vskMain', 'boxCompleteInformation');
        me.beanDetail.beanString = JSON.stringify(rowData.data);
        Ext.Ajax.request({
            url: prototype.url + '/searchInfCallCenter',
            method: 'POST',
            timeout: 60000000,
            params: me.beanDetail,
            beforerequest: Ext.getCmp(prototype.id + '-boxCompleteInformation').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var beanCall = res.beanInfo;
                me.beanCall = beanCall;
                console.log(beanCall);

                if (beanCall.strDescError === '') {
                    Ext.getCmp(prototype.id + '-txtPNR').setValue(beanCall.PNR);
                    Ext.getCmp(prototype.id + '-txtTKT').setValue(beanCall.strTicket);
                    Ext.getCmp(prototype.id + '-txtCARDNBR').setValue(beanCall.strDescripcion);
                    Ext.getCmp(prototype.id + '-txtAUTHO').setValue(beanCall.AUTHNBR);
                    Ext.getCmp(prototype.id + '-txtSALEDATE').setValue(beanCall.SALEDATE);
                    Ext.getCmp(prototype.id + '-txtMERCHNAM').setValue(beanCall.MERCHNAM);
                    Ext.getCmp(prototype.id + '-txtAGENTE').setValue(beanCall.AGENTE);
                    Ext.getCmp(prototype.id + '-txtAUTAMOUNT').setValue(beanCall.AUTAMOUNT);
                    Ext.getCmp(prototype.id + '-txtDESCRIPCION').setValue(beanCall.strDescStatus);
                    Ext.getCmp(prototype.id + '-txtDIRECCION').setValue(beanCall.strDireccion);
                    Ext.getCmp(prototype.id + '-txtMERCHN').setValue(beanCall.MERCHN);
                    Ext.getCmp(prototype.id + '-txtNOMPAX').setValue(beanCall.PAX);
                    Ext.getCmp(prototype.id + '-txtNOMPAX2').setValue(beanCall.PAX);
                    Ext.getCmp(prototype.id + '-txtFVUELO').setValue(beanCall.FVLO1);
                    Ext.getCmp(prototype.id + '-txtNOMTARHAB').setValue(beanCall.NOMTARHAB);
                    Ext.getCmp(prototype.id + '-txtCOMMENT').setValue(beanCall.COMMENT);
                    Ext.getCmp(prototype.id + '-txtDESCVENTA').setValue('Mo/To');
                    Ext.getCmp(prototype.id + '-btnSave').hide();
                    if (beanCall.strImgLink === 'Y') {
                        Ext.getCmp(prototype.id + '-btnSave').hide();
                        Ext.getCmp(prototype.id + '-txtNOMTARHAB').setDisabled(true);
                        Ext.getCmp(prototype.id + '-txtCOMMENT').setDisabled(true);
                    } else {
                        Ext.getCmp(prototype.id + '-btnSave').show();
                        Ext.getCmp(prototype.id + '-txtNOMTARHAB').setDisabled(false);
                        Ext.getCmp(prototype.id + '-txtCOMMENT').setDisabled(false);
                    }


                } else {
                    global.Msg({
                        msg: beanCall.strDescError
                    });
                }

                Ext.getCmp(prototype.id + '-boxCompleteInformation').unmask();
//                strDescError
            }
        });
    },
    cleanFormulario: function() {
        Ext.getCmp(prototype.id + '-txtPNR').setValue('');
        Ext.getCmp(prototype.id + '-txtTKT').setValue('');
        Ext.getCmp(prototype.id + '-txtCARDNBR').setValue('');
        Ext.getCmp(prototype.id + '-txtAUTHO').setValue('');
        Ext.getCmp(prototype.id + '-txtSALEDATE').setValue('');
        Ext.getCmp(prototype.id + '-txtMERCHNAM').setValue('');
        Ext.getCmp(prototype.id + '-txtAGENTE').setValue('');
        Ext.getCmp(prototype.id + '-txtAUTAMOUNT').setValue('');
        Ext.getCmp(prototype.id + '-txtDESCRIPCION').setValue('');
        Ext.getCmp(prototype.id + '-txtDIRECCION').setValue('');
        Ext.getCmp(prototype.id + '-txtMERCHN').setValue('');
        Ext.getCmp(prototype.id + '-txtNOMPAX').setValue('');
        Ext.getCmp(prototype.id + '-txtNOMPAX2').setValue('');
        Ext.getCmp(prototype.id + '-txtFVUELO').setValue('');
        Ext.getCmp(prototype.id + '-txtNOMTARHAB').setValue('');
        Ext.getCmp(prototype.id + '-txtCOMMENT').setValue('');
        Ext.getCmp(prototype.id + '-txtDESCVENTA').setValue('Mo/To');
    },
    btnBack_click2: function(obj, e) {
        Ext.getCmp(prototype.id + '-contentOptions').setVisible(true);
        Ext.getCmp(prototype.id + '-contentFilter').setVisible(true);
        this.btnBack_click();
    },
    onClicSave: function() {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Sure to Save?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    me.validateSave();
                }
            }
        });
    },
    validateSave: function() {

        var tarjetaHabiente = Ext.getCmp(prototype.id + '-txtNOMTARHAB').getValue();
        var comentario = Ext.getCmp(prototype.id + '-txtCOMMENT').getValue();

        if (tarjetaHabiente !== "" && comentario !== "") {
            if (me.beanCall.strDescError === '') {

                me.beanCall.NOMTARHAB = tarjetaHabiente;
                me.beanCall.COMMENT = comentario;
                me.save();

            } else {
                global.Msg({
                    msg: 'An error has ocurred. Please contact our System Department.'
                });
            }
        } else {
            global.Msg({
                msg: 'Please enter all required fields.'
            });
        }


    },
    save: function() {
        console.log("Ejecutar Save");
        var params = {};
        params.beanString = JSON.stringify(me.beanCall);
        params.strOption = 'I';
        console.log(params);
        Ext.Ajax.request({
            url: prototype.url + '/saveInfCallCenter',
            method: 'POST',
            timeout: 60000000,
            params: params,
            beforerequest: Ext.getCmp(prototype.id + '-boxCompleteInformation').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msjError = res.msjRes;

                console.log(res);

                if (msjError !== "") {
                    global.Msg({
                        msg: res.msj
                    });

                    if (msjError.substr(0, 7) === 'SUCCESS') {
                        me.btnBack_click2();
                    }
                }

            }

        });
    },
    exportExcel: function() {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    global.getFile(me._path);
                }
            }
        });
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        this.getPaggin().moveFirst();
    },
    pagPrevious: function(obj, e) {
        this.getPaggin().movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin().moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin().moveLast();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function(padre, child, add) {
        add = add === undefined ? true : add;
        if (add && this.peek() !== prototype.id + '-' + child)
            this.stack.push(prototype.id + '-' + child);
        win.selectedChild(padre, child);
        var paggin = this.getPaggin();
        if (paggin === null) {
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
            Ext.getCmp(prototype.id + '-boxPagDetail').hide();
        } else {
            var pagData = paggin.getPageData();
            var currentPage = win.formatLngNumber(pagData.currentPage);
            var pageCount = win.formatLngNumber(pagData.pageCount);
            var total = win.formatLngNumber(pagData.total);
            win.setText('lblPagActual', currentPage);
            win.setText('lblPagTotal', pageCount);
            win.setText('lblRowsTotal', total);
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
            Ext.getCmp(prototype.id + '-boxPagDetail').hide();
            var width = 0, wt;
            var boxChild = Ext.getCmp(prototype.id + '-' + child).items.items;
            for (var i = 0; i < boxChild.length; i++) {
                wt = boxChild[i].getWidth();
                if (wt > width) {
                    width = wt;
                }
            }
            Ext.getCmp(prototype.id + '-boxPagDetail').setWidth(width);
        }
    },
    getPaggin: function() {
        switch (this.peek()) {
            case prototype.id + '-boxMainData':
                return Ext.getCmp(prototype.id + '-paggin');
            case prototype.id + '-boxDetCountry':
                return Ext.getCmp(prototype.id + '-paggin2');
            case prototype.id + '-boxDetCard':
                return Ext.getCmp(prototype.id + '-paggin3');
            case prototype.id + '-boxDetDay':
                return Ext.getCmp(prototype.id + '-paggin4');
            case prototype.id + '-boxDetTicket':
                return Ext.getCmp(prototype.id + '-paggin5');
            case prototype.id + '-boxDetCountryS':
                return Ext.getCmp(prototype.id + '-paggin6');
            case prototype.id + '-boxDetCardS':
                return Ext.getCmp(prototype.id + '-paggin7');
            case prototype.id + '-boxDetDayS':
                return Ext.getCmp(prototype.id + '-paggin8');
            case prototype.id + '-boxDetTktMatch':
                return Ext.getCmp(prototype.id + '-paggin9');
            default:
                return null;
        }
    },
    peek: function() {
        if (this.stack.length > 0) {
            return this.stack[this.stack.length - 1];
        } else
            return "";
    },
    onValidarChange: function(cmp, value) {
        var list = cmp.getValue().replace(/\s/g, "").split("");
        var txt = '';
        for (var i = 0; i < list.length; i++) {
            if (list[i].toLowerCase() === list[i].toUpperCase()) {
                txt += list[i];
            }
        }
        cmp.setValue(txt.substring(0, 13));
        if (cmp.getValue() === '') {
            this.habilitarFiltros();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    }
// </editor-fold>
});
