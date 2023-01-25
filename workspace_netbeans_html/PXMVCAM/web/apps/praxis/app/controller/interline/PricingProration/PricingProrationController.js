Ext.define('Ext.Praxis.controller.interline.PricingProration.PricingProrationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PricingProrationController',
    bean: {},
    fecha: new Date(),
    childs: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    searchParams: {},
    paramsDetail: {},
    lstCampos: new Array(),
    lstConditions: new Array(),
    _path: '',
    _pathGroup: '',
//    NPROG: 'PX00000216',
    init: function(view) {
        me = this;
        me.panelActual = '-boxMainData';
        
        this.control({
            // -------------------Eventos Genericos --------------------
            '#PricingProrationForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            //-----------------Eventos Especificos -------------------            
            '#PricingProrationForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#PricingProrationForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#PricingProrationForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#PricingProrationForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
            '#PricingProrationForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#PricingProrationForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#PricingProrationForm-btn-pag-next': {
                click: this.pagNext
            },
            '#PricingProrationForm-btn-pag-last': {
                click: this.pagLast
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
    },
    viewGrupo_clickHandler: function(column, e, row, column, x, rowData) {
        this.bean = x.record.data;
        
        var selectedValue = win.getValue('radiogroup1').radiogroup1;
        
        this.bean.TEST = selectedValue;
        me.panelActual = '-boxGroupData';
        this.searchGroup(this.bean);
    },
    viewProrate: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var beanD = {};
        beanD.A020NROPRT = data.A050NROPRT;
        beanD.strTicket = data.strTicket;
//        this.NPROG = 'PX00000216';
        
        prototypeProgram.view = 'interline-pricing-proration-form';
        prototypeProgram.nprog = 'PX00000216';
        prototypeProgram.title = 'IR:Pricing and Proration';
        prototypeProgram.modulo = '';
        
        win.displayScrProrrateoIxC(this, beanD, 'PricingProrate');
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.imgSearch_clickHandler();
        }
    },
    ChangeFunction: function() {
        win.setValue('txtGrupoFrom', '');
        win.setValue('txtGrupoTo', '');
        if (win.getValue('cmbFuncion') === 'CR') {
            win.visible('hbRange', true);
        } else {
            win.visible('hbRange', false);
        }
    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function(obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboFromDay: function(obj) {
        var cmbDateToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        cmbDateToDay.setValue(obj.getValue());
    },
    selectComboToMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    setStoreData: function() {

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());

        var mes = new Date().getMonth() + 1;
        if (mes < 10)
            mes = "0" + mes;
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(mes);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(mes);

        this.imgClear_clickHandler();

        this.obtainDataCombo();

        win.setValue('cmbSource', '');
        win.focus('txtGRUPO');
        this.imgSearch_clickHandler();
    },
    //<editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        this.bean.IN_FECHA_FROM = win.getValue("cmbDateFromYear") + win.getValue('cmbDateFromMonth');
        this.bean.IN_FECHA_TO = win.getValue('cmbDateToYear') + win.getValue('cmbDateToMonth');
        this.bean.PERIOD = win.getValue('cmbStatus');
        this.bean.TUSO = win.getValue('cmbSource');
        this.bean.IN_PERIOD = win.getValue('txtGRUPO');
        
        var selectedValue = win.getValue('radiogroup1').radiogroup1;
        if(selectedValue === 'ISR' || selectedValue === 'ISRCL'){
            
            if (selectedValue === 'ISRCL') {
                this.bean.IN_SFL = '2';
            } else {
                this.bean.IN_SFL = '1';
            }
            win.selectedChild('panelMain', 'boxRepDate');
            me.panelActual = '-boxRepDate';
            this.searchISR(this.bean);
            
        } else if (selectedValue === 'ISRUM'){
            win.selectedChild('panelMain', 'boxRepUnMatch');
            me.panelActual = '-boxRepUnMatch';
            console.log('searchISRUnMatch');
            this.searchISRUnMatch(this.bean);
        } else {
            win.selectedChild('panelMain', 'boxMainData');
            me.panelActual = '-boxMainData';
            this.bean.TEST = selectedValue;
            console.log(this.bean.TEST);
            this.search(this.bean);
        }
    },
    cmbTypeRep_changeHandler: function () {

        Ext.getCmp(prototype.id + '-btn-pag-first').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-pag-previous').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-pag-next').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-pag-last').setVisible(true);
        
        var selectedValue = win.getValue('radiogroup1').radiogroup1;
        switch(selectedValue){
            case 'ISR':
                    win.enabled('txtGRUPO', false);
                    win.enabled('cmbDateToYear', false);
                    win.enabled('cmbDateToMonth', false);
                    Ext.getCmp(prototype.id + '-pie').setVisible(false);
                    Ext.getCmp(prototype.id + '-btn-pag-first').setVisible(false);
                    Ext.getCmp(prototype.id + '-btn-pag-previous').setVisible(false);
                    Ext.getCmp(prototype.id + '-btn-pag-next').setVisible(false);
                    Ext.getCmp(prototype.id + '-btn-pag-last').setVisible(false);
                    
                    break;
            case 'ISRCL':
                    win.enabled('txtGRUPO', false);
                    win.enabled('cmbDateToYear', false);
                    win.enabled('cmbDateToMonth', false);
                    Ext.getCmp(prototype.id + '-pie').setVisible(false);
                    Ext.getCmp(prototype.id + '-btn-pag-first').setVisible(false);
                    Ext.getCmp(prototype.id + '-btn-pag-previous').setVisible(false);
                    Ext.getCmp(prototype.id + '-btn-pag-next').setVisible(false);
                    Ext.getCmp(prototype.id + '-btn-pag-last').setVisible(false);
                    break;
            case 'ISRUM':
                    win.enabled('txtGRUPO', false);
                    win.enabled('cmbDateToYear', false);
                    win.enabled('cmbDateToMonth', false);
                    Ext.getCmp(prototype.id + '-pie').setVisible(false);
                    Ext.getCmp(prototype.id + '-btn-pag-first').setVisible(false);
                    Ext.getCmp(prototype.id + '-btn-pag-previous').setVisible(false);
                    Ext.getCmp(prototype.id + '-btn-pag-next').setVisible(false);
                    Ext.getCmp(prototype.id + '-btn-pag-last').setVisible(false);
                    break;
            case 'ISRGR':
                    win.enabled('txtGRUPO', true);
                    win.enabled('cmbDateToYear', false);
                    win.enabled('cmbDateToMonth', false);
                    win.setText('labelDate', 'Flight <br>Date');
                    Ext.getCmp(prototype.id + '-pie').setVisible(true);
                    break;
            case 'NORMAL':
                    win.enabled('txtGRUPO', true);
                    win.enabled('cmbDateToYear', true);
                    win.enabled('cmbDateToMonth', true);
                    win.setText('labelDate', 'Clearing <br>Date');
                    Ext.getCmp(prototype.id + '-pie').setVisible(true);
                    break;
	}
        this.imgSearch_clickHandler();
    },
    imgFilter_clickHandler_1: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.setVisible(false);
        else
            option.setVisible(true);
    },
    imgExcel_clickHandler: function(obj, e) {
//        console.log("imgExcel_clickHandler");
        if (win.visible('centerC')) {
//            console.log(_path);
            this.exportExcel(_path);
        } else if (win.visible('boxGroupData')) {
//            console.log(_pathGroup);
            this.exportExcel(_pathGroup);
        }
    },
    imgClear_clickHandler: function(obj, e) {
        win.setValue('txtGRUPO', '');
        win.setValue('txtAirline', '');
        win.setValue('txtA050FCONTA', '');
        win.setValue('txtA050TUSO', '');
        win.setValue('txtA050MNRCD', '');
        win.setValue('txtA050PSTRF', '');

//        Ext.getCmp(prototype.id+'-cmbDateFromYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id+'-cmbDateToYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id+'-cmbDateFromMonth').setValue('');
//        Ext.getCmp(prototype.id+'-cmbDateFromDay').setValue('');
//        Ext.getCmp(prototype.id+'-cmbDateToMonth').setValue('');
//        Ext.getCmp(prototype.id+'-cmbDateToDay').setValue('');
//        Ext.getCmp(prototype.id+'-cmbFacturado').setValue('');
//        Ext.getCmp(prototype.id+'-txtCia').setValue('');

    },
    imgSearch_clickHandlerTKT: function() {
        if (win.visible('boxGroupData')) {
            var grupo = win.getValue('txtGrupo').trim();
            var esCant = false;

            if (grupo !== '') {

                //Armando Query ===========================================
                var strSQL = '';
                var campo = '';
                var temp = '';

                //=========================================================
                //Campo 1 =================================================
                if (win.visible('txtCampo1')) {
                    campo = this.getCampoSql(win.getValue('txtCampo1').toUpperCase());
                } else {
                    campo = win.getValue('cmbCampo1').toUpperCase();
                }

                if (campo !== '' && win.getValue('txtValue1') !== '') {
                    temp = win.getValue('txtValue1').toUpperCase();

                    if (esCant) {
                        strSQL += campo + " " + this.getConectorSql(win.getValue('cmbOperador1'), win.getCmp('cmbOperador1')) + " " + temp + " ";
                    } else {
                        strSQL += campo + " " + this.getConectorSql(win.getValue('cmbOperador1'), win.getCmp('cmbOperador1')) + " '" + temp + "' ";
                    }

                    //Campo 2 =============================================
                    esCant = false;
                    if (win.visible('txtCampo2')) {
                        campo = this.getCampoSql(win.getValue('txtCampo2').toUpperCase());
                    } else {
                        campo = win.getValue('cmbCampo2').toUpperCase();
                    }
                    if (campo !== '' && win.getValue('txtValue2') !== '') {

                        temp = win.getValue('txtValue2').toUpperCase();

                        if (esCant) {
                            strSQL += win.getValue('cmbConector2').toUpperCase() + " " + campo + " "
                                    + this.getConectorSql(win.getValue('cmbOperador2'), win.getCmp('cmbOperador2')) + " " + temp + " ";
                        } else {
                            strSQL += String(cmbConector2.selectedItem.data).toUpperCase() + " " + campo + " "
                                    + this.getConectorSql(cmbOperador2.text, cmbOperador2) + " '" + temp + "' ";
                        }

                        //Campo 3 =========================================
                        esCant = false;
                        if (win.visible('txtCampo3')) {
                            campo = this.getCampoSql(win.getValue('txtCampo3').toUpperCase());
                        } else {
                            campo = win.getValue('cmbCampo3').toUpperCase();
                        }
                        if (campo !== '' && win.getValue('txtValue3') !== '') {

                            temp = win.getValue('txtValue3').toUpperCase();

                            if (esCant) {
                                strSQL += win.getValue('cmbConector3').toUpperCase() + " " + campo + " "
                                        + this.getConectorSql(win.getValue('cmbOperador3'), win.getCmp('cmbOperador3')) + " " + temp + " ";
                            } else {
                                strSQL += win.getValue('cmbConector3').toUpperCase() + " " + campo + " "
                                        + this.getConectorSql(win.getValue('cmbOperador3'), win.getCmp('cmbOperador3')) + " '" + temp + "' ";
                            }


                            //Campo 4 ====================================
                            esCant = false;
                            if (win.visible('txtCampo4')) {
                                campo = this.getCampoSql(win.getValue('txtCampo4').toUpperCase());
                            } else {
                                campo = win.getValue('cmbCampo4').toUpperCase();
                            }
                            if (campo !== '' && win.getValue('txtValue4') != '') {

                                temp = win.getValue('txtValue4').toUpperCase();

                                if (esCant) {
                                    strSQL += win.getValue('cmbConector4').toUpperCase() + " " + campo + " "
                                            + this.getConectorSql(win.getValue('cmbOperador4'), win.getCmp('cmbOperador4')) + " " + temp + " ";
                                } else {
                                    strSQL += win.getValue('cmbConector4').toUpperCase() + " " + campo + " "
                                            + this.getConectorSql(win.getValue('cmbOperador4'), win.getCmp('cmbOperador4')) + " '" + temp + "' ";
                                }
                            }
                            //=============================================
                        }
                        //=================================================
                    }
                    //=====================================================
                }
                //=========================================================
                this.bean.A050GRUPO = grupo;
                this.bean.strSQL = strSQL;
                
                me.panelActual = '-boxGroupData';
                this.searchGroup(this.bean);
            } else {
                global.Msg({msg: 'Group Number is required.'});
            }
        } else {
            me.panelActual = '-boxMainData';
            this.search(this.bean);
        }
    },
    imgSearch_clickHandlerValid: function() {
        if (win.visible('boxGroupData')) {
            var grupofrom = win.getValue('txtGrupoFrom').trim();
            var grupoto = win.getValue('txtGrupoTo').trim();
            var esCant = false;

            if (grupofrom !== '') {

                //Armando Query ===========================================
                var strSQL = '';
                var campo = '';
                var temp = '';

                //=========================================================
                //Campo 1 =================================================
                if (win.visible('txtCampo1')) {
                    campo = this.getCampoSql(win.getValue('txtCampo1').toUpperCase());
                } else {
                    campo = win.getValue('cmbCampo1').toUpperCase();
                }

                if (campo !== '' && win.getValue('txtValue1') !== '') {
                    temp = win.getValue('txtValue1').toUpperCase();

                    if (esCant) {
                        strSQL += campo + " " + this.getConectorSql(win.getValue('cmbOperador1'), win.getCmp('cmbOperador1')) + " " + temp + " ";
                    } else {
                        strSQL += campo + " " + this.getConectorSql(win.getValue('cmbOperador1'), win.getCmp('cmbOperador1')) + " '" + temp + "' ";
                    }

                    //Campo 2 =============================================
                    esCant = false;
                    if (win.visible('txtCampo2')) {
                        campo = this.getCampoSql(win.getValue('txtCampo2').toUpperCase());
                    } else {
                        campo = win.getValue('cmbCampo2').toUpperCase();
                    }
                    if (campo !== '' && win.getValue('txtValue2') !== '') {

                        temp = win.getValue('txtValue2').toUpperCase();

                        if (esCant) {
                            strSQL += win.getValue('cmbConector2').toUpperCase() + " " + campo + " "
                                    + this.getConectorSql(win.getValue('cmbOperador2'), win.getCmp('cmbOperador2')) + " " + temp + " ";
                        } else {
                            strSQL += String(cmbConector2.selectedItem.data).toUpperCase() + " " + campo + " "
                                    + this.getConectorSql(cmbOperador2.text, cmbOperador2) + " '" + temp + "' ";
                        }

                        //Campo 3 =========================================
                        esCant = false;
                        if (win.visible('txtCampo3')) {
                            campo = this.getCampoSql(win.getValue('txtCampo3').toUpperCase());
                        } else {
                            campo = win.getValue('cmbCampo3').toUpperCase();
                        }
                        if (campo !== '' && win.getValue('txtValue3') !== '') {

                            temp = win.getValue('txtValue3').toUpperCase();

                            if (esCant) {
                                strSQL += win.getValue('cmbConector3').toUpperCase() + " " + campo + " "
                                        + this.getConectorSql(win.getValue('cmbOperador3'), win.getCmp('cmbOperador3')) + " " + temp + " ";
                            } else {
                                strSQL += win.getValue('cmbConector3').toUpperCase() + " " + campo + " "
                                        + this.getConectorSql(win.getValue('cmbOperador3'), win.getCmp('cmbOperador3')) + " '" + temp + "' ";
                            }


                            //Campo 4 ====================================
                            esCant = false;
                            if (win.visible('txtCampo4')) {
                                campo = this.getCampoSql(win.getValue('txtCampo4').toUpperCase());
                            } else {
                                campo = win.getValue('cmbCampo4').toUpperCase();
                            }
                            if (campo !== '' && win.getValue('txtValue4') != '') {

                                temp = win.getValue('txtValue4').toUpperCase();

                                if (esCant) {
                                    strSQL += win.getValue('cmbConector4').toUpperCase() + " " + campo + " "
                                            + this.getConectorSql(win.getValue('cmbOperador4'), win.getCmp('cmbOperador4')) + " " + temp + " ";
                                } else {
                                    strSQL += win.getValue('cmbConector4').toUpperCase() + " " + campo + " "
                                            + this.getConectorSql(win.getValue('cmbOperador4'), win.getCmp('cmbOperador4')) + " '" + temp + "' ";
                                }
                            }
                            //=============================================
                        }
                        //=================================================
                    }
                    //=====================================================
                }
                //=========================================================
                this.bean.IN_GRUPO_FROM = grupofrom;
                this.bean.IN_GRUPO_TO = grupoto;
                this.bean.strSQL = strSQL;

                this.validarGrupos(this.bean);
            } else {
                global.Msg({msg: 'Group Number is required.'});
            }
        } 
    },
    CloseGroup_clickHandler: function() {

        var funcion = win.getValue('cmbFuncion').trim();
        var grupoFrom = win.getValue('txtGrupoFrom').trim();
        var grupoTo = win.getValue('txtGrupoTo').trim();
        var grupo = win.getValue('txtGRUPO').trim();
        
        console.log('CloseGroup_clickHandler');
        console.log(this.bean.TEST);
        if (funcion === 'CR') {

            if (grupoFrom.length < 6 || grupoTo.length < 6) {
                alert("Range of groups is invalid");
            } else {

                Ext.Msg.show({
                    title: '.:PRAXIS:.',
                    msg: 'Close this range of Groups?',
                    buttons: Ext.MessageBox.OKCANCEL,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function(btn) {
                        if (btn === 'ok') {

                            this.bean.IN_GRUPO_FROM = grupoFrom;
                            this.bean.IN_GRUPO_TO = grupoTo;

                            Ext.Ajax.request({
                                url: prototype.url + '/CloseRangeGroup',
                                method: 'POST',
                                timeout: 60000000,
                                params: {beanString: JSON.stringify(this.bean)},
                                success: function(response, opts) {

                                    //win.lblUser_toolTip("Estructura: A1691");
                                    var res = Ext.JSON.decode(response.responseText);
                                    var msj = res.MSJ;

                                    global.Msg({msg: msj});

                                },
                                failure: function(response, opts) {
                                    console.log('server-side failure with status code ' + response.status);
                                }
                            });
                        }
                    }
                });

            }

        } else if (funcion === 'C') {

            var rowsTot = win.getText("lblRowsTotal").trim();
            var lblFlag = win.getText('lblFlag').trim();

            if (rowsTot !== '0') {
                if (lblFlag !== '' && lblFlag.indexOf('Domestic') === -1 && lblFlag.indexOf('International') === -1) {
                    global.Msg({msg: 'You can not close this group'});
                } else {

                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: 'Close Group?',
                        buttons: Ext.MessageBox.OKCANCEL,
                        scope: this,
                        icon: Ext.MessageBox.QUESTION,
                        modal: true,
                        fn: function(btn) {
                            if (btn === 'ok') {

                                this.bean.IN_PERIOD = grupo;

                                Ext.Ajax.request({
                                    url: prototype.url + '/CloseGroup',
                                    method: 'POST',
                                    timeout: 60000000,
                                    params: {beanString: JSON.stringify(this.bean)},
                                    success: function(response, opts) {

                                        //win.lblUser_toolTip("Estructura: A1691");
                                        var res = Ext.JSON.decode(response.responseText);
                                        var msj = res.MSJ;

                                        global.Msg({msg: msj});

                                    },
                                    failure: function(response, opts) {
                                        console.log('server-side failure with status code ' + response.status);
                                    }
                                });
                            }
                        }
                    });
                }
            }

        } else {
            global.Msg({msg: 'Choose an option'});
        }
    },
    imgFilter_clickHandler: function() {
        var option = Ext.getCmp(prototype.id + '-filtroData');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    imgBack_clickHandler: function() {
         if (win.visible('boxGroupData')) {
            win.selectedChild('main', 'centerC');
        } else if (win.visible('boxRepUMTkt')) {
            win.selectedChild('panelMain', 'boxRepUnMatch');
        }
    },
    //</editor-fold>
    
    imgClearQ_clickHandler: function(cmp) {
        switch (cmp.id) {
            case prototype.id + '-imgClear1':
                win.setValue('cmbOperador1', '');
                win.setValue('cmbCampo1', '');
                win.setValue('txtCampo1', '');
                win.setValue('txtValue1', '');
                win.visible('cmbCampo1', false);
                win.visible('txtCampo1', true);
                break;
            case prototype.id + '-imgClear2':
                win.setValue('cmbConector2', 'AND');
                win.setValue('cmbOperador2', '');
                win.setValue('cmbCampo2', '');
                win.setValue('txtCampo2', '');
                win.setValue('txtValue2', '');
                win.visible('cmbCampo2', false);
                win.visible('txtCampo2', true);
                break;
            case prototype.id + '-imgClear3':
                win.setValue('cmbConector3', 'AND');
                win.setValue('cmbOperador3', '');
                win.setValue('cmbCampo3', '');
                win.setValue('txtCampo3', '');
                win.setValue('txtValue3', '');
                win.visible('cmbCampo3', false);
                win.visible('txtCampo3', true);
                break;
            case prototype.id + '-imgClear4':
                win.setValue('cmbConector4', 'AND');
                win.setValue('cmbOperador4', '');
                win.setValue('cmbCampo4', '');
                win.setValue('txtCampo4', '');
                win.setValue('txtValue4', '');
                win.visible('cmbCampo4', false);
                win.visible('txtCampo4', true);
                break;
        }
    },
    imgInfo_clickHandler: function(cmp, e, eOpts) {
        switch (cmp.id) {
            case prototype.id + '-imgInfo1':
                // <editor-fold defaultstate="collapsed" desc="imgInfo1">
                var txtCampo1 = Ext.getCmp(prototype.id + '-txtCampo1');
                var cmbCampo1 = Ext.getCmp(prototype.id + '-cmbCampo1');
                if (txtCampo1.isVisible()) {
                    txtCampo1.hide();
                    cmbCampo1.show();
                    var valor = txtCampo1.getValue();
                    if (valor === 'All') {
                        cmbCampo1.setValue('');
                    } else {
                        cmbCampo1.setRawValue(valor);
                    }
                } else {
                    txtCampo1.show();
                    cmbCampo1.hide();
                    var valor = cmbCampo1.getRawValue();
                    if (valor === undefined) {
                        txtCampo1.setValue('');
                    } else if (valor !== 'All') {
                        txtCampo1.setValue(valor);
                    } else {
                        txtCampo1.setValue('');
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
                    var valor = txtCampo2.getValue();
                    if (valor === 'All') {
                        cmbCampo2.setValue('');
                    } else {
                        cmbCampo2.setRawValue(valor);
                    }
                } else {
                    txtCampo2.show();
                    cmbCampo2.hide();
                    var valor = cmbCampo2.getRawValue();
                    if (valor === undefined) {
                        txtCampo2.setValue('');
                    } else if (valor !== 'All') {
                        txtCampo2.setValue(valor);
                    } else {
                        txtCampo2.setValue('');
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
                    var valor = txtCampo3.getValue();
                    if (valor === 'All') {
                        cmbCampo3.setValue('');
                    } else {
                        cmbCampo3.setRawValue(valor);
                    }
                } else {
                    txtCampo3.show();
                    cmbCampo3.hide();
                    var valor = cmbCampo3.getRawValue();
                    if (valor === undefined) {
                        txtCampo3.setValue('');
                    } else if (valor !== 'All') {
                        txtCampo3.setValue(valor);
                    } else {
                        txtCampo3.setValue('');
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
                    var valor = txtCampo4.getValue();
                    if (valor === 'All') {
                        cmbCampo4.setValue('');
                    } else {
                        cmbCampo4.setRawValue(valor);
                    }
                } else {
                    txtCampo4.show();
                    cmbCampo4.hide();
                    var valor = cmbCampo4.getRawValue();
                    if (valor === undefined) {
                        txtCampo4.setValue('');
                    } else if (valor !== 'All') {
                        txtCampo4.setValue(valor);
                    } else {
                        txtCampo4.setValue('');
                    }
                }
                // </editor-fold>
                break;
        }
    },
    getCampoSql: function(campo) {
        var objCampo = {};
        var campoA1248 = '';
        for (var c = 0; c < this.lstCampos.length; c++) {
            objCampo = this.lstCampos[c];
            if (objCampo.USERFIELD.trim() === campo.trim()) {
                campoA1248 = objCampo.SYSTFIELD.trim();
                break;
            }
        }
        return campoA1248;
    },
    getConectorSql: function(operador, combo) {
        var operadorEq = '';
        switch (operador.trim()) {
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
                combo.setValue("");
                break;
        }

        return operadorEq;
    },
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function(bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    win.lblUser_toolTip("Estructura: WRF071");
                    me.setWidthPie();
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        
                        if (obj.data.length > 0) {
                            var Objtemp = obj.data.items[0].data;
                            
                            var pag = Ext.getCmp(prototype.id + '-paggin');
                            var pagData = pag.getPageData();
                            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                            Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                            
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
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        _path = prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean));
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchISR">
    searchISR: function(bean) {
        
        var selectedValue = win.getValue('radiogroup1').radiogroup1;
        if(selectedValue === 'ISRCL'){
            Ext.getCmp(prototype.id + '-boxRepDate').setWidth(517);
            Ext.getCmp(prototype.id + '-dgcCloseDay').hide();
        }
        else{
            Ext.getCmp(prototype.id + '-dgcCloseDay').show();
            Ext.getCmp(prototype.id + '-boxRepDate').setWidth(557);
        }
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchISR'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    win.lblUser_toolTip("Estructura: A050");
                    me.setWidthPie();
                    
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
        Ext.getCmp(prototype.id + '-gridRepDate').bindStore(storeGridDatas);
//        _path = prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean));
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchISRUnMatch">
    searchISRUnMatch: function(bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchISRUnMatch'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    win.lblUser_toolTip("Estructura: A3734");
                    me.setWidthPie();
                    
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
        Ext.getCmp(prototype.id + '-gridRepUnMatch').bindStore(storeGridDatas);
//        _path = prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean));
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchGroup">
    searchGroup: function(bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchGroup'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    win.lblUser_toolTip("Estructura: A050");

                    win.selectedChild('main', 'boxGroupData');
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {

                        if (obj.data.length > 0) {
                            var Objtemp = obj.data.items[0].data;
                            win.setText('lblFlag', '');
                            win.setValue('txtGrupo', Objtemp.A050GRUPO);
                            win.setValue('txtAirline', Objtemp.strDescripcion1);
                            win.setValue('txtA050FCONTA', Objtemp.strFormatDate);
                            win.setValue('txtA050PSTRF', Objtemp.A050PSTRF);
                            win.setValue('txtA050TUSO', Objtemp.A050TUSO);
                            win.setValue('txtA050MNRCD', Objtemp.A050MNRCD);

                            var pagData = win.getCmp('paggin2').getPageData();
                            win.setText('lblPagActual', win.formatLngNumber(pagData.currentPage));
                            win.setText('lblPagTotal', win.formatLngNumber(pagData.pageCount));
                            win.setText('lblRowsTotal', win.formatLngNumber(pagData.total));
                            if (Objtemp.strDescripcion5 !== '') {
                                win.setText('lblFlag', Objtemp.strDescripcion5);
                            }
                        } else {
                            global.Msg({msg: 'Coupons not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataGroup').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        _pathGroup = prototype.url + '/getXLSXGroup?beanString=' + encodeURI(JSON.stringify(bean));
    },
    validarGrupos: function(bean) {
    console.log(bean.TEST);
     Ext.Ajax.request({
            url: prototype.url + '/validarGrupos',
            method: 'POST',

            params: {
                beanString: JSON.stringify(bean)
            },
            success: function(response, options) {

                var res = Ext.JSON.decode(response.responseText);
                if (res.data.length > 0) {
                       var Objtemp = res.data[0];

                       if (Objtemp.strDescripcion5 !== '') {
                           global.Msg({msg: Objtemp.strDescripcion5});
                        }else{
                           global.Msg({msg: 'Range of Groups is ok'});   
                        }
               } else {
                    global.Msg({msg: 'Something`s wrong'});
               }

            }
        });
  },
    //</editor-fold>
    
    viewDetailUMTkt_clickHandler: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
       
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-pag-first').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-pag-previous').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-pag-next').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-pag-last').setVisible(true);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
        
        this.beanDet = rowData.data;
        win.selectedChild('panelMain', 'boxRepUMTkt');
        me.panelActual = '-boxRepUMTkt';
        this.setGridDetISRUM_Tkt(this.beanDet);
    },
    setGridDetISRUM_Tkt: function(beanDet) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchISRUM_Tkt'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanDet)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    win.lblUser_toolTip("Estructura: A3734");
                    me.setWidthPie();

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
//
                        if (obj.data.length > 0) {
                            var Objtemp = obj.data.items[0].data;
                            var pag = Ext.getCmp(prototype.id + '-paggin');
                            var pagData = pag.getPageData();
                            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                            Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//                          
                            Ext.getCmp(prototype.id+'-gridDataRepUMTkt').setTitle(Objtemp.strTitulo);

                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataRepUMTkt').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
//        _pathGroup = prototype.url + '/getXLSXGroup?beanString=' + encodeURI(JSON.stringify(beanDet));
    },
    closeDayISR_clickHandler: function (grid, rowIndex, colIndex) {
        
        var rec = grid.getStore().getAt(rowIndex);
        var beanC = rec.data;
        
        if(beanC.A050FUSO === ''){
            global.Msg({msg: 'Error: The date can not be closed.'});
        }else{
//            var perc = (beanC.QMATCH * 100) / beanC.QTY;
//            if(perc < 60){
//                global.Msg({ msg: 'Error: The date can not be closed. Match Flown is less than 60% of the Total.'});
//            } else {
//                this.CloseDayISR(beanC);
//            }

            Ext.Ajax.request({
                url: prototype.url + '/ValidarDayISR',
                method: 'POST',
                timeout: 60000000,
                params: {beanString: JSON.stringify(beanC)},
                success: function(response, opts) {

                    var res = Ext.JSON.decode(response.responseText);
                    var msj = res.MSJ;

                    Ext.Msg.show({
                                title: '.:PRAXIS:.',
                                msg: msj,
                                buttons: Ext.MessageBox.OKCANCEL,
                                scope: this,
                                icon: Ext.MessageBox.QUESTION,
                                modal: true,
                                fn: function(btn) {
                                    if (btn === 'ok') {
                                        me.CloseDayISR(beanC);
                                    }
                                }
                    });

//                    global.Msg({msg: msj});
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }      
        
    },
    CloseDayISR: function(beanC) {
        
        Ext.Ajax.request({
            url: prototype.url + '/CloseDayISR',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanC)},
            success: function(response, opts) {

                var res = Ext.JSON.decode(response.responseText);
                var msj = res.MSJ;

                global.Msg({msg: msj});
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    
    //<editor-fold defaultstate="collapsed" desc="obtainDataCombo">
    obtainDataCombo: function() {
        var operadores = new Array(), source = new Array();
        var store;
        Ext.Ajax.request({
            url: prototype.url + '/obtainDataCombo',
            method: 'POST',
            timeout: 60000000,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.lstConditions = res.lstOperTkt;
                    // <editor-fold defaultstate="collapsed" desc="cargar operadores">
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
                    win.setValue('cmbOperador1', '');
                    win.setValue('cmbOperador2', '');
                    win.setValue('cmbOperador3', '');
                    win.setValue('cmbOperador4', '');
                    // </editor-fold>

                    //console.log("lstSource : " + lstSource);                    
                    // <editor-fold defaultstate="collapsed" desc="cargar source">
                    var lstSource = res.lstSource;
                    source.push(['', 'All']);
                    lstSource.forEach(function callback(currentValue, index, array) {
                        source.push([currentValue.CODSOUR, currentValue.CODSOUR + ' - ' + currentValue.DESSOU]);
                    });
                    var storeUsos = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'usos', autoLoad: true, data: source, fields: ['CODSOUR', 'DESSOU']
                    });
                    Ext.getCmp(prototype.id + '-cmbSource').bindStore(storeUsos);
                    /*Ext.getCmp(prototype.id+'-cmbCampo1').bindStore(store);
                     Ext.getCmp(prototype.id+'-cmbCampo2').bindStore(store);
                     Ext.getCmp(prototype.id+'-cmbCampo3').bindStore(store);
                     Ext.getCmp(prototype.id+'-cmbCampo4').bindStore(store);
                     
                     win.setValue('cmbCampo1', '');
                     win.setValue('cmbCampo2', '');
                     win.setValue('cmbCampo3', '');
                     win.setValue('cmbCampo4', '');*/
                    //</editor-fold>

                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    exportExcel: function(_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
    },
    setWidthPie: function() {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-panelPie').setWidth(ancho);
    },
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    
    peek: function() {
        if (this.stack.length > 0)
            return this.stack[this.stack.length - 1];
        else
            return "";
    },
    getPaggin: function() {
        me.pagginActual = '';
        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-boxMainData':
                    me.pagginActual = '-paggin';
                    break;
            case  '-boxGroupData':
                   me.pagginActual = '-paggin2';
                   break;
            case '-boxRepUMTkt':
                  me.pagginActual = '-paggin3';
                   break;
            default:
                return null;
        }
    },
    getInt: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getIntColor: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#E1FFE1;';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor1: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#E6FFE6;';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getStringColor1: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:center;background:#E6FFE6;';
        return value;
    },
    getDoubleColor2: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#E0F0FF;';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getStringColor2: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:center;background:#E0F0FF;';
        return value;
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    }
});
