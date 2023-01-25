Ext.define('Ext.Praxis.controller.interline.PricingOver.PricingOverController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PricingOverController',
    dataObtain: {},
    childs: '',
    lstConditions: {},
    lstCampos: {},
    bean: {},
    gridSelectAC: new Array(),
    gridDataAC: new Array(),
//    _path: '',
    me: '',
    setContext: function() {
        me = this;
    },
    init: function (view) {
        me = this;
        prototype.id = 'PricingOverForm';
        prototype.url = CONTEXTPATH + '/PricingOver';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-boxConsultas').items.items;
        this.obtainData();
    },
    afterRender: function () {
        this.imgClear_clickHandler();
    },
    imgInfo_clickHandler: function (cmp, e, eOpts) {
        switch (cmp.id) {
            case prototype.id + '-imgInfo1':
                // <editor-fold defaultstate="collapsed" desc="imgInfo1">
                var txtCampo1 = Ext.getCmp(prototype.id + '-txtCampo1');
                var cmbCampo1 = Ext.getCmp(prototype.id + '-cmbCampo1');
                if (txtCampo1.isVisible()) {
                    txtCampo1.hide();
                    cmbCampo1.show();
                } else {
                    txtCampo1.show();
                    var value = cmbCampo1.getRawValue();
                    cmbCampo1.hide();
                    if (value !== '' && value !== 'All') {
                        txtCampo1.setValue(value.substring(0, value.indexOf("-")-1));
                    }
                }
                // </editor-fold>
                break;
            case prototype.id + '-imgInfo2':
                // <editor-fold defaultstate="collapsed" desc="imgInfo2">
                var txtCampo2 = Ext.getCmp(prototype.id + '-txtCampo2');
                var cmbCampo2 = Ext.getCmp(prototype.id + '-cmbCampo2');
                if (txtCampo2.isVisible()) {
                    txtCampo2.hide();
                    cmbCampo2.show();
                } else {
                    txtCampo2.show();
                    var value = cmbCampo2.getRawValue();
                    cmbCampo2.hide();
                    if (value !== '' && value !== 'All') {
                        txtCampo2.setValue(value.substring(0, value.indexOf("-")-1));
                    }
                }
                // </editor-fold>
                break;
            case prototype.id + '-imgInfo3':
                // <editor-fold defaultstate="collapsed" desc="imgInfo3">
                var txtCampo3 = Ext.getCmp(prototype.id + '-txtCampo3');
                var cmbCampo3 = Ext.getCmp(prototype.id + '-cmbCampo3');
                if (txtCampo3.isVisible()) {
                    txtCampo3.hide();
                    cmbCampo3.show();
                } else {
                    txtCampo3.show();
                    var value = cmbCampo3.getRawValue();
                    cmbCampo3.hide();
                    if (value !== '' && value !== 'All') {
                        txtCampo3.setValue(value.substring(0, value.indexOf("-")-1));
                    }
                }
                // </editor-fold>
                break;
            case prototype.id + '-imgInfo4':
                // <editor-fold defaultstate="collapsed" desc="imgInfo4">
                var txtCampo4 = Ext.getCmp(prototype.id + '-txtCampo4');
                var cmbCampo4 = Ext.getCmp(prototype.id + '-cmbCampo4');
                if (txtCampo4.isVisible()) {
                    txtCampo4.hide();
                    cmbCampo4.show();
                } else {
                    txtCampo4.show();
                    var value = cmbCampo4.getRawValue();
                    cmbCampo4.hide();
                    if (value !== '' && value !== 'All') {
                        txtCampo4.setValue(value.substring(0, value.indexOf("-")-1));
                    }
                }
                // </editor-fold>
                break;
        }
    },
    imgMasivo_clickHandler: function (cmp) {
        switch (cmp.id) {
            case prototype.id+'-imgTax':
                this.post_to_url(CONTEXTPATH + '/Home#interline-tax-analysis-documents-form', {}, 'post', 'TAXAnalysisDocumentsForm');
                break;
            case prototype.id+'-imgUnder':
                this.post_to_url(CONTEXTPATH + '/Home#interline-pricing-under-form', {}, 'post', 'PricingUnderForm');
                break;
        }
    },
    post_to_url: function(path, params, method, id) {
        method = method || "post";

        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);
        form.setAttribute("id", id);

        document.body.appendChild(form);
        form.submit();
    },
    imgSwap_clickHandler: function () {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            this.selectedChild('boxSwapData', 'paggin', false);
        } else {
            this.selectedChild('boxMainData', 'paggin', false);
        }
    },
    imgClearQ_clickHandler: function (cmp) {
        switch (cmp.id) {
            case prototype.id + '-imgClear1':
                this.setValue('cmbOperador1', '');
                this.setValue('cmbCampo1', '');
                this.setValue('txtCampo1', '');
                this.setValue('txtValue1', '');
                Ext.getCmp(prototype.id + '-cmbCampo1').hide();
                Ext.getCmp(prototype.id + '-txtCampo1').show();
                break;
            case prototype.id + '-imgClear2':
                this.setValue('cmbConector2', 'AND');
                this.setValue('cmbOperador2', '');
                this.setValue('cmbCampo2', '');
                this.setValue('txtCampo2', '');
                this.setValue('txtValue2', '');
                Ext.getCmp(prototype.id + '-cmbCampo2').hide();
                Ext.getCmp(prototype.id + '-txtCampo2').show();
                break;
            case prototype.id + '-imgClear3':
                this.setValue('cmbConector3', 'AND');
                this.setValue('cmbOperador3', '');
                this.setValue('cmbCampo3', '');
                this.setValue('txtCampo3', '');
                this.setValue('txtValue3', '');
                Ext.getCmp(prototype.id + '-cmbCampo3').hide();
                Ext.getCmp(prototype.id + '-txtCampo3').show();
                break;
            case prototype.id + '-imgClear4':
                this.setValue('cmbConector4', 'AND');
                this.setValue('cmbOperador4', '');
                this.setValue('cmbCampo4', '');
                this.setValue('txtCampo4', '');
                this.setValue('txtValue4', '');
                Ext.getCmp(prototype.id + '-cmbCampo4').hide();
                Ext.getCmp(prototype.id + '-txtCampo4').show();
                break;
        }
    },
    imgInfoHelp_clickHandler: function (cmp, e, eOpts) {
        Ext.create('Ext.Praxis.view.interline.PricingOverForm.DataEntry', {
            id: 'DataEntryPricingOverForm',
            params: {
                gridDataAC: me.lstCampos
            }
        }).show();
    },

    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function (obj, e) {
        var grupo = this.getValue("txtGrupo");
        var esCant = false;
        
        if (grupo !== '') {
            //Armando Query ===========================================
            var strSQL = '', campo = '', temp = '';
            
            //<editor-fold defaultstate="collapsed" desc="Campo 1">
            var txtCampo1 = Ext.getCmp(prototype.id + '-txtCampo1');
            if (txtCampo1.isVisible()) {
                campo = this.getCampoSql(this.getValue("txtCampo1").toUpperCase());
            } else {
                campo = this.getValue("cmbCampo1").toUpperCase();
            }
            
            if (campo !== '' && this.getValue("txtValue1") !== '') {
                temp = this.getValue("txtValue1").toUpperCase();
                
                if (esCant) {
                    strSQL += campo+" "+this.getConectorSql(this.getValue("cmbOperador1"), Ext.getCmp(prototype.id+'-cmbOperador1'))+" "+temp+" ";
                } else {
                    strSQL += campo+" "+this.getConectorSql(this.getValue("cmbOperador1"), Ext.getCmp(prototype.id+'-cmbOperador1'))+" '"+temp+"' ";
                }
                //<editor-fold defaultstate="collapsed" desc="Campo 2">
                esCant = false;
                var txtCampo2 = Ext.getCmp(prototype.id + '-txtCampo2');
                if (txtCampo2.isVisible()) {
                    campo = this.getCampoSql(this.getValue("txtCampo2").toUpperCase());
                } else {
                    campo = this.getValue("cmbCampo2").toUpperCase();
                }

                if (campo !== '' && this.getValue("txtValue2") !== '') {
                    temp = this.getValue("txtValue2").toUpperCase();

                    if (esCant) {
                        strSQL += this.getValue("cmbConector2").toUpperCase() + " " + campo+" "
                        + this.getConectorSql(this.getValue("cmbOperador2"), Ext.getCmp(prototype.id+'-cmbOperador2'))+" "+temp+" ";
                    } else {
                        strSQL += this.getValue("cmbConector2").toUpperCase() + " " + campo+" "
                        + this.getConectorSql(this.getValue("cmbOperador2"), Ext.getCmp(prototype.id+'-cmbOperador2'))+" '"+temp+"' ";
                    }
                    //<editor-fold defaultstate="collapsed" desc="Campo 3">
                    esCant = false;
                    var txtCampo3 = Ext.getCmp(prototype.id + '-txtCampo3');
                    if (txtCampo3.isVisible()) {
                        campo = this.getCampoSql(this.getValue("txtCampo3").toUpperCase());
                    } else {
                        campo = this.getValue("cmbCampo3").toUpperCase();
                    }

                    if (campo !== '' && this.getValue("txtValue3") !== '') {
                        temp = this.getValue("txtValue3").toUpperCase();

                        if (esCant) {
                            strSQL += this.getValue("cmbConector3").toUpperCase() + " " + campo+" "
                            + this.getConectorSql(this.getValue("cmbOperador3"), Ext.getCmp(prototype.id+'-cmbOperador3'))+" "+temp+" ";
                        } else {
                            strSQL += this.getValue("cmbConector3").toUpperCase() + " " + campo+" "
                            + this.getConectorSql(this.getValue("cmbOperador3"), Ext.getCmp(prototype.id+'-cmbOperador3'))+" '"+temp+"' ";
                        }

                        //<editor-fold defaultstate="collapsed" desc="Campo 4">
                        esCant = false;
                        var txtCampo4 = Ext.getCmp(prototype.id + '-txtCampo4');
                        if (txtCampo4.isVisible()) {
                            campo = this.getCampoSql(this.getValue("txtCampo4").toUpperCase());
                        } else {
                            campo = this.getValue("cmbCampo4").toUpperCase();
                        }

                        if (campo !== '' && this.getValue("txtValue4") !== '') {
                            temp = this.getValue("txtValue4").toUpperCase();

                            if (esCant) {
                                strSQL += this.getValue("cmbConector4").toUpperCase() + " " + campo+" "
                                + this.getConectorSql(this.getValue("cmbOperador4"), Ext.getCmp(prototype.id+'-cmbOperador4'))+" "+temp+" ";
                            } else {
                                strSQL += this.getValue("cmbConector4").toUpperCase() + " " + campo+" "
                                + this.getConectorSql(this.getValue("cmbOperador4"), Ext.getCmp(prototype.id+'-cmbOperador4'))+" '"+temp+"' ";
                            }
                        }
                        //</editor-fold>
                    }
                    //</editor-fold>
                }
                //</editor-fold>
            }
            //</editor-fold>
            
            this.bean.A020GRUPO = grupo;
            this.bean.strSQL = strSQL;
            this.searchGroupData(this.bean, true);
        } else {
            global.Msg({msg: 'Group Number is required.'});
        }
    },
    imgFilter_clickHandler: function () {
        var option = Ext.getCmp(prototype.id + '-boxSearchFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    imgExcel_clickHandler: function (obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    //<editor-fold defaultstate="collapsed" desc="imgClear_clickHandler">
    imgClear_clickHandler: function (obj, e) {
        this.setValue('txtGrupo', '');
        this.setValue('txtStatus', '');
        this.setValue('txtInvDate', '');
        this.setValue('txtInvoice', '');
        this.setValue('txtCurrency', '');
        this.setValue('txtSource', '');
        this.setValue('txtAirline', '');
        this.setValue('txtClearing', '');
        this.setValue('txtQINV', '');
        this.setValue('txtQMISS', '');
        this.setValue('txtQMATCH', '');
        this.setValue('txtQOTAX', '');
        this.setValue('txtQLIMIT', '');
        this.setValue('txtSPA', '');
        this.setValue('txtQPHY', '');
        this.setValue('txtQPGROSS', '');
        this.setValue('txtQOVER', '');
        this.setValue('txtQOW1', '');
        this.setValue('txtRT1', '');
        this.setValue('txtQNSPA', '');
        this.setValue('txtQREV', '');
        this.setValue('txtQPTAX', '');
        this.setValue('txtQUNDER', '');
        this.setValue('txtQOW2', '');
        this.setValue('txtRT2', '');
        this.setValue('txtQPEND', '');
        this.setValue('txtQRM', '');
        
        this.setValue('cmbConector2', 'AND');
        this.setValue('cmbConector3', 'AND');
        this.setValue('cmbConector4', 'AND');
        this.setValue('cmbOperador1', '');
        this.setValue('cmbOperador2', '');
        this.setValue('cmbOperador3', '');
        this.setValue('cmbOperador4', '');
        this.setValue('cmbCampo1', '');
        this.setValue('cmbCampo2', '');
        this.setValue('cmbCampo3', '');
        this.setValue('cmbCampo4', '');
        this.setValue('txtCampo1', '');
        this.setValue('txtCampo2', '');
        this.setValue('txtCampo3', '');
        this.setValue('txtCampo4', '');
        this.setValue('txtValue1', '');
        this.setValue('txtValue2', '');
        this.setValue('txtValue3', '');
        this.setValue('txtValue4', '');
        
        Ext.getCmp(prototype.id + '-cmbCampo1').hide();
        Ext.getCmp(prototype.id + '-cmbCampo2').hide();
        Ext.getCmp(prototype.id + '-cmbCampo3').hide();
        Ext.getCmp(prototype.id + '-cmbCampo4').hide();
        
        Ext.getCmp(prototype.id + '-txtCampo1').show();
        Ext.getCmp(prototype.id + '-txtCampo2').show();
        Ext.getCmp(prototype.id + '-txtCampo3').show();
        Ext.getCmp(prototype.id + '-txtCampo4').show();
        
        Ext.getCmp(prototype.id+'-gridData').getStore().removeAll();
        Ext.getCmp(prototype.id+'-gridSwap').getStore().removeAll();
    },
    //</editor-fold>
    imgBack_clickHandler: function () {
        global.showMenu();
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="obtainData">
    obtainData: function () {
        this.dataObtain.OPERADOR = 1;
        this.dataObtain.CAMPO = 1;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: { beanString: JSON.stringify(this.dataObtain) },
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var store;
                    me.lstConditions = res.lstOPERADOR;
                    // <editor-fold defaultstate="collapsed" desc="cargar operadores">
                    var operadores = new Array();
                    operadores.push(['', 'All']);
                    me.lstConditions.forEach(function callback(currentValue, index, array) {
                        operadores.push([currentValue.USERFIELD, currentValue.USERFIELD]);
                    });
                    store = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'operadores', autoLoad: true, data: operadores, fields: ['code', 'name']
                    });
                    Ext.getCmp(prototype.id + '-cmbOperador1').bindStore(store);
                    Ext.getCmp(prototype.id + '-cmbOperador2').bindStore(store);
                    Ext.getCmp(prototype.id + '-cmbOperador3').bindStore(store);
                    Ext.getCmp(prototype.id + '-cmbOperador4').bindStore(store);
                    // </editor-fold>
            
                    me.lstCampos = res.lstCAMPO;
                    // <editor-fold defaultstate="collapsed" desc="cargar campos">
                    var campos = new Array();
                    campos.push(['', 'All']);
                    me.lstCampos.forEach(function callback(currentValue, index, array) {
                        campos.push([currentValue.SYSTFIELD, currentValue.USERFIELD + ' - ' + currentValue.DESCRIPT]);
                    });
                    store = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'campos', autoLoad: true, data: campos, fields: ['code', 'name']
                    });
                    Ext.getCmp(prototype.id + '-cmbCampo1').bindStore(store);
                    Ext.getCmp(prototype.id + '-cmbCampo2').bindStore(store);
                    Ext.getCmp(prototype.id + '-cmbCampo3').bindStore(store);
                    Ext.getCmp(prototype.id + '-cmbCampo4').bindStore(store);
                    // </editor-fold>
                } else global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchGroupData">
    searchGroupData: function (bean, buscarGrupo) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchGroupData'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean), buscarDatosGrupo: buscarGrupo};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1199/PRO9304");
                    me.gridDataAC = obj.data.items;
                    if (obj.data.length > 0) {
                        if (!me.peek().includes('boxMainData')) me.selectedChild('boxMainData', 'paggin');
                        else me.selectedChild('boxMainData', 'paggin', false);
                    } else {
                        global.Msg({msg: 'Coupons not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        
        Ext.Ajax.request({
            url: prototype.url + '/searchGroupData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean), buscarDatosGrupo: buscarGrupo},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.bean = res.recInvoice;
                    if (buscarGrupo) {
                        if (me.bean !== undefined && bean.A020GRUPO !== '') {
                            //<editor-fold defaultstate="collapsed" desc="setValue">
                            me.setValue('txtStatus', me.bean.strStval.trim());
                            me.setValue('txtInvDate', me.bean.A020SUFACT.trim());
                            me.setValue('txtInvoice', me.bean.strInvoice.trim());
                            me.setValue('txtCurrency', me.bean.strCurrenc.trim());
                            me.setValue('txtSource', me.bean.A020TUSO.trim());
                            me.setValue('txtAirline', me.bean.A020AIRLIN.trim() + ' - ' + me.bean.strAirlineName.trim() + ' - ' + me.bean.strAlfa.trim());
                            me.setValue('txtClearing', me.bean.A020FRECHA.trim());
                            me.setValue('txtQINV', Ext.util.Format.number(me.bean.lngQCUPON, '0,000'));
                            me.setValue('txtQMISS', Ext.util.Format.number(me.bean.lngQMISS, '0,000'));
                            me.setValue('txtQMATCH', Ext.util.Format.number(me.bean.lngQMATCH, '0,000'));
                            me.setValue('txtQOTAX', Ext.util.Format.number(me.bean.lngQOTAX, '0,000'));
                            me.setValue('txtQLIMIT', Ext.util.Format.number(me.bean.lngQLIMIT, '0,000'));
                            me.setValue('txtSPA', me.bean.strIndSPA.trim());
                            me.setValue('txtQPHY', Ext.util.Format.number(me.bean.lngPCUPON, '0,000'));
                            me.setValue('txtQPGROSS', Ext.util.Format.number(me.bean.lngQPGROSS, '0,000'));
                            me.setValue('txtQOVER', Ext.util.Format.number(me.bean.lngQOVER, '0,000'));
                            me.setValue('txtQOW1', Ext.util.Format.number(me.bean.lngQOW1, '0,000'));
                            me.setValue('txtRT1', Ext.util.Format.number(me.bean.lngQRT1, '0,000'));
                            me.setValue('txtQNSPA', Ext.util.Format.number(me.bean.lngQNSPA, '0,000'));
                            me.setValue('txtQREV', Ext.util.Format.number(me.bean.lngQREV, '0,000'));
                            me.setValue('txtQPTAX', Ext.util.Format.number(me.bean.lngQPTAX, '0,000'));
                            me.setValue('txtQUNDER', Ext.util.Format.number(me.bean.lngQUNDER, '0,000'));
                            me.setValue('txtQOW2', Ext.util.Format.number(me.bean.lngQOW2, '0,000'));
                            me.setValue('txtRT2', Ext.util.Format.number(me.bean.lngQRT2, '0,000'));
                            me.setValue('txtQPEND', Ext.util.Format.number(me.bean.lngQPEND, '0,000'));
                            me.setValue('txtQRM', Ext.util.Format.number(me.bean.lngQRM, '0,000'));
                            //</editor-fold>
                        } else {
                            global.Msg({msg: 'Group Data Not found.'});
                        }
                    }
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    exportExcel: function () {
//        if (Ext.getCmp(prototype.id+'-gridDataQtySumm').isVisible()) {
//            global.getFile(_pathQtySummary);
//        }
    },
    getCampoSql: function (campo) {
        var objCampo = {};
        var campoA1248 = '';
        for (var i = 0; i < me.lstCampos.length; i++) {
            objCampo = me.lstCampos[i];
            if (objCampo.USERFIELD === campo) {
                campoA1248 = objCampo.SYSTFIELD.trim();
                break;
            }
        }
        return campoA1248;
    },
    getConectorSql: function(operador, combo) {
        var operadorEq = '';
        switch (operador) {
            case 'EQ':
                operadorEq = '=';
                break;
            case 'GT':
                operadorEq = '>';
                break;
            case 'LT':
                operadorEq = '<';
                break;
            case 'GE':
                operadorEq = '>=';
                break;
            case 'LE':
                operadorEq = '<=';
                break;
            case 'NE':
                operadorEq = '<>';
                break;
            case 'LIKE':
                operadorEq = '>=';
                break;
            case 'NLIKE':
                operadorEq = 'NOT LIKE';
                break;
            default:
                operadorEq = '=';
                combo.setValue('');
        }
        return operadorEq;
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
    selectedChild: function (boxId, pagginId, add) {
        global.selectedChild(this.childs, prototype.id + '-' + boxId);
        add = add === null || add === undefined ? true : add;
        if(add) this.stack.push(prototype.id + '-' + boxId);
        
        if (pagginId === null || pagginId === undefined || pagginId.length === 0) {
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
            Ext.getCmp(prototype.id + '-pie').hide();
        } else {
            //<editor-fold defaultstate="collapsed" desc="setPaggin">
            var pagData = Ext.getCmp(prototype.id + '-' + pagginId).getPageData();
            
            var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
            var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
            var total = Ext.util.Format.number(pagData.total, '0,000');

            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
            Ext.getCmp(prototype.id + '-lbl-total').setText(total);
            //</editor-fold>
            Ext.getCmp(prototype.id + '-boxPaginacion').show();
            Ext.getCmp(prototype.id + '-pie').show();
            
            var width = 0, wt;
            var boxChild = Ext.getCmp(prototype.id + '-' + boxId).items.items;
            for (var i = 0; i < boxChild.length; i++) {
                wt = boxChild[i].getWidth();
                if (wt > width) {
                    width = wt;
                }
            }
            Ext.getCmp(prototype.id + '-pie').setWidth(width);
        }
    },
    peek: function () {
        return this.stack[this.stack.length - 1];
    },
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    }
    // </editor-fold>
});
