Ext.define('Ext.Praxis.controller.program.ProMatchTktController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProMatchTktController',
    childs: '',
    stack: [],
    bean: {},
    lstConditions: [],
    lstCampos: [],
    init: function(view) {
        this.childs = Ext.getCmp(prototype.MatchTkt.id+'-vskDataGrid').items.items;
        prototype.MatchTkt = {
            id: 'ProMatchTktForm',
            url: CONTEXTPATH+'/ProMatchTkt'
        };
        this.imgFilter_clickHandler();
        
        this.setStoreData();
        
        this.initDate();
    },
    startDisplay: function () {
        
        Ext.getCmp(prototype.MatchTkt.id+'-boxSearchFilter').show();
        this.imgClear_clickHandler();
        console.log(this.bean);
        this.obtainDataCombo();
    },
    initDate: function() {
        Ext.getCmp(prototype.MatchTkt.id+'-cmbDateYear').setValue(new Date().getFullYear());
        var mes = new Date().getMonth()+1; if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.MatchTkt.id+'-cmbDateMonth').setValue(mes);
        Ext.getCmp(prototype.MatchTkt.id+'-cmbDateFromDay').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbDateToDay').setValue("");
    },
    setStoreData: function () {
        var storeComboDataYear = win.getStoreYear(true);
        Ext.getCmp(prototype.MatchTkt.id+'-cmbDateYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.MatchTkt.id+'-cmbDateMonth').bindStore(storeComboDataMonth);

        var days = new Array();
        days.push(['', 'All']);
        var storeComboDataDay = win.getStoreDays(true);
        Ext.getCmp(prototype.MatchTkt.id+'-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.MatchTkt.id+'-cmbDateToDay').bindStore(storeComboDataDay);
    },
    imgInfo_clickHandler: function (cmp, e, eOpts) {
        switch (cmp.id) {
            case prototype.MatchTkt.id+'-imgInfo1':
                // <editor-fold defaultstate="collapsed" desc="imgInfo1">
                var txtCampo1 = Ext.getCmp(prototype.MatchTkt.id+'-txtCampo1');
                var cmbCampo1 = Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo1');
                if (txtCampo1.isVisible()) {
                    txtCampo1.hide();
                    cmbCampo1.show();
                    var valor = txtCampo1.getValue();
                    if (valor === 'All') {
                        cmbCampo1.setValue('');
                    } else {
                        cmbCampo1.setValue(valor);
                    }
                } else {
                    txtCampo1.show();
                    cmbCampo1.hide();
                    var valor = cmbCampo1.getValue();
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
            case prototype.MatchTkt.id+'-imgInfo2':
                // <editor-fold defaultstate="collapsed" desc="imgInfo2">
                var txtCampo2 = Ext.getCmp(prototype.MatchTkt.id+'-txtCampo2');
                var cmbCampo2 = Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo2');
                if (txtCampo2.isVisible()) {
                    txtCampo2.hide();
                    cmbCampo2.show();
                    var valor = txtCampo2.getValue();
                    if (valor === 'All') {
                        cmbCampo2.setValue('');
                    } else {
                        cmbCampo2.setValue(valor);
                    }
                } else {
                    txtCampo2.show();
                    cmbCampo2.hide();
                    var valor = cmbCampo2.getValue();
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
            case prototype.MatchTkt.id+'-imgInfo3':
                // <editor-fold defaultstate="collapsed" desc="imgInfo3">
                var txtCampo3 = Ext.getCmp(prototype.MatchTkt.id+'-txtCampo3');
                var cmbCampo3 = Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo3');
                if (txtCampo3.isVisible()) {
                    txtCampo3.hide();
                    cmbCampo3.show();
                    var valor = txtCampo3.getValue();
                    if (valor === 'All') {
                        cmbCampo3.setValue('');
                    } else {
                        cmbCampo3.setValue(valor);
                    }
                } else {
                    txtCampo3.show();
                    cmbCampo3.hide();
                    var valor = cmbCampo3.getValue();
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
            case prototype.MatchTkt.id+'-imgInfo4':
                // <editor-fold defaultstate="collapsed" desc="imgInfo4">
                var txtCampo4 = Ext.getCmp(prototype.MatchTkt.id+'-txtCampo4');
                var cmbCampo4 = Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo4');
                if (txtCampo4.isVisible()) {
                    txtCampo4.hide();
                    cmbCampo4.show();
                    var valor = txtCampo4.getValue();
                    if (valor === 'All') {
                        cmbCampo4.setValue('');
                    } else {
                        cmbCampo4.setValue(valor);
                    }
                } else {
                    txtCampo4.show();
                    cmbCampo4.hide();
                    var valor = cmbCampo4.getValue();
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
            case prototype.MatchTkt.id+'-imgInfo5':
                // <editor-fold defaultstate="collapsed" desc="imgInfo5">
                var txtCampo5 = Ext.getCmp(prototype.MatchTkt.id+'-txtCampo5');
                var cmbCampo5 = Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo5');
                if (txtCampo5.isVisible()) {
                    txtCampo5.hide();
                    cmbCampo5.show();
                    var valor = txtCampo5.getValue();
                    if (valor === 'All') {
                        cmbCampo5.setValue('');
                    } else {
                        cmbCampo5.setValue(valor);
                    }
                } else {
                    txtCampo5.show();
                    cmbCampo5.hide();
                    var valor = cmbCampo5.getValue();
                    if (valor === undefined) {
                        txtCampo5.setValue('');
                    } else if (valor !== 'All') {
                        txtCampo5.setValue(valor);
                    } else {
                        txtCampo5.setValue('');
                    }
                }
                // </editor-fold>
                break;
            case prototype.MatchTkt.id+'-imgInfo6':
                // <editor-fold defaultstate="collapsed" desc="imgInfo6">
                var txtCampo6 = Ext.getCmp(prototype.MatchTkt.id+'-txtCampo6');
                var cmbCampo6 = Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo6');
                if (txtCampo6.isVisible()) {
                    txtCampo6.hide();
                    cmbCampo6.show();
                    var valor = txtCampo6.getValue();
                    if (valor === 'All') {
                        cmbCampo6.setValue('');
                    } else {
                        cmbCampo6.setValue(valor);
                    }
                } else {
                    txtCampo6.show();
                    cmbCampo6.hide();
                    var valor = cmbCampo6.getValue();
                    if (valor === undefined) {
                        txtCampo6.setValue('');
                    } else if (valor !== 'All') {
                        txtCampo6.setValue(valor);
                    } else {
                        txtCampo6.setValue('');
                    }
                }
                // </editor-fold>
                break;
            case prototype.MatchTkt.id+'-imgInfo7':
                // <editor-fold defaultstate="collapsed" desc="imgInfo7">
                var txtCampo7 = Ext.getCmp(prototype.MatchTkt.id+'-txtCampo7');
                var cmbCampo7 = Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo7');
                if (txtCampo7.isVisible()) {
                    txtCampo7.hide();
                    cmbCampo7.show();
                    var valor = txtCampo7.getValue();
                    if (valor === 'All') {
                        cmbCampo7.setValue('');
                    } else {
                        cmbCampo7.setValue(valor);
                    }
                } else {
                    txtCampo7.show();
                    cmbCampo7.hide();
                    var valor = cmbCampo7.getValue();
                    if (valor === undefined) {
                        txtCampo7.setValue('');
                    } else if (valor !== 'All') {
                        txtCampo7.setValue(valor);
                    } else {
                        txtCampo7.setValue('');
                    }
                }
                // </editor-fold>
                break;
        }
    },
    Apply_clickHandler: function () {
        if (Ext.getCmp(prototype.MatchTkt.id+'-cmbApply').getValue() !== '') {
            this.execApply(this.bean);
        }
    },
    //<editor-fold defaultstate="collapsed" desc="button">
    imgSearch_clickHandler: function () {
        var msg = this.validarFecha();
	
	if(msg === ''){
		
            this.bean.strYearFrom = Ext.getCmp(prototype.MatchTkt.id+'-cmbDateYear').getValue();
            
            this.bean.strMonthFrom = Ext.getCmp(prototype.MatchTkt.id+'-cmbDateMonth').getValue();
            this.bean.strDayFrom = Ext.getCmp(prototype.MatchTkt.id+'-cmbDateFromDay').getValue();
            this.bean.strDayTo = Ext.getCmp(prototype.MatchTkt.id+'-cmbDateToDay').getValue();
            this.bean.IN_TDOC = Ext.getCmp(prototype.MatchTkt.id+'-cmbTranType').getValue();
            this.bean.IN_PAYMENT = Ext.getCmp(prototype.MatchTkt.id+'-cmbFOP').getValue();
            this.bean.IN_STVAL = Ext.getCmp(prototype.MatchTkt.id+'-cmbStatus').getValue();
            // ===========================================================
            console.log(this.bean);
            if(this.bean.strYearFrom !== '' && this.bean.strMonthFrom !== ''
                    && this.bean.strYearFrom !== '0' && this.bean.strMonthFrom !== '0'){

                //=========================================================
                var strSQL = this.armandoSQL();
                console.log(strSQL);
                this.bean.strSQL = strSQL;
                console.log("----- > Bean a buscar");
                console.log(this.bean);
                this.search(this.bean);

            }else{
                global.Msg({msg: 'Please enter all required fields.'});
            }
		
	}else{
            global.Msg({msg: msg});
	}
    },
    imgFilter_clickHandler: function () {
        var option = Ext.getCmp(prototype.MatchTkt.id+'-boxSearchFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    imgExcel_clickHandler: function () {
        console.log("imgExcel_clickHandler");
    },
    imgClear_clickHandler: function () {
        this.initDate();
        
        Ext.getCmp(prototype.MatchTkt.id+'-cmbConector2').setValue("AND");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbConector3').setValue("AND");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbConector4').setValue("AND");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador1').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador2').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador3').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador4').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador5').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador6').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador7').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo1').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo2').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo3').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo4').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo5').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo6').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo7').setValue("");
        
        Ext.getCmp(prototype.MatchTkt.id+'-cmbTranType').setValue("S");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbFOP').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-cmbStatus').setValue("");
        
        Ext.getCmp(prototype.MatchTkt.id+'-txtCampo1').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-txtCampo2').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-txtCampo3').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-txtCampo4').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-txtCampo5').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-txtCampo6').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-txtCampo7').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-txtValue1').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-txtValue2').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-txtValue3').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-txtValue4').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-txtValue5').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-txtValue6').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-txtValue7').setValue("");
        Ext.getCmp(prototype.MatchTkt.id+'-txtComment').setValue("");
        
        Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo1').hide();
        Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo2').hide();
        Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo3').hide();
        Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo4').hide();
        Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo5').hide();
        Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo6').hide();
        Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo7').hide();
        Ext.getCmp(prototype.MatchTkt.id+'-txtCampo1').show();
        Ext.getCmp(prototype.MatchTkt.id+'-txtCampo2').show();
        Ext.getCmp(prototype.MatchTkt.id+'-txtCampo3').show();
        Ext.getCmp(prototype.MatchTkt.id+'-txtCampo4').show();
        Ext.getCmp(prototype.MatchTkt.id+'-txtCampo5').show();
        Ext.getCmp(prototype.MatchTkt.id+'-txtCampo6').show();
        Ext.getCmp(prototype.MatchTkt.id+'-txtCampo7').show();
        
        Ext.getCmp(prototype.MatchTkt.id+'-gridDetTicket').getStore().removeAll();
    },
    imgMatch_clickHandler: function () {
        var obs = Ext.getCmp(prototype.MatchTkt.id+'-txtComment').getValue().trim();
	this.bean.strYearFrom = Ext.getCmp(prototype.MatchTkt.id+'-cmbDateYear').getValue();
	this.bean.strMonthFrom = Ext.getCmp(prototype.MatchTkt.id+'-cmbDateMonth').getValue();
	this.bean.strDayFrom = Ext.getCmp(prototype.MatchTkt.id+'-cmbDateFromDay').getValue();
	this.bean.strDayTo = Ext.getCmp(prototype.MatchTkt.id+'-cmbDateToDay').getValue();
	this.bean.IN_TDOC = Ext.getCmp(prototype.MatchTkt.id+'-cmbTranType').getValue();
	this.bean.IN_PAYMENT = Ext.getCmp(prototype.MatchTkt.id+'-cmbFOP').getValue();
	this.bean.strComment = Ext.getCmp(prototype.MatchTkt.id+'-cmbStatus').getValue();
	this.bean.strComment = "MATCH "+obs;
	
	if(this.bean.IN_STVAL === "4"){
	    Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Sure to Apply Manual Match?',
                buttons: Ext.Msg.OKCANCEL,
                icon: Ext.Msg.QUESTION,
                fn: function(btn) {
                    if (btn === 'ok') {
                        if(obs === ''){
                            global.Msg({msg: 'Comment field is required.'});
                            Ext.getCmp(prototype.MatchTkt.id+'-txtComment').focus();
                        }else{
                            var msg = this.validarFecha();
                            if(msg === ''){
                                // ===========================================================
                                if(this.bean.strYearFrom.trim() !== '' && this.bean.strMonthFrom.trim() !== ''
                                    && this.bean.strYearFrom.trim() !== '0' && this.bean.strMonthFrom.trim() !== '0'){

                                    //=========================================================
                                    var strSQL = this.armandoSQL();
                                    this.bean.strSQL = strSQL;
                                    //Paginación ==============================================
                                    this.matchManual(this.bean);
                                }else{
                                    global.Msg({ msg: 'Please enter all required fields.' });
                                }
                            }else{
                                global.Msg({ msg: msg });
                            }
                        }
                    }
                }
            });
	}else{
            global.Msg({ msg: 'Manual Match only Apply for *Match Difference* tickets.' });
	}
    },
    //</editor-fold>
    
    mostrarData: function () { 
        console.log(this.bean);
        if(this.bean !== undefined && this.bean.IN_SDATE !== ""){
		
            if(this.bean.IN_SDATE.length === 6){
                Ext.getCmp(prototype.MatchTkt.id+'-cmbDateYear').setValue(this.bean.IN_SDATE.substring(0, 4));
//                Ext.getCmp(prototype.MatchTkt.id+'-cmbDateMonth').setValue());
                console.log(win.getAbreviaturaMes(this.bean.IN_SDATE.substring(4, 6)));
                Ext.getCmp(prototype.MatchTkt.id+'-cmbDateMonth').setValue(this.bean.IN_SDATE.substring(4, 6));
            }
            Ext.getCmp(prototype.MatchTkt.id+'-cmbTranType').setValue(this.bean.IN_TDOC);
            Ext.getCmp(prototype.MatchTkt.id+'-cmbFOP').setValue(this.bean.IN_PAYMENT);
            Ext.getCmp(prototype.MatchTkt.id+'-cmbStatus').setValue(this.bean.IN_STVAL);
            if(this.bean.CERROR !== ''){
                this.buscarCampoLibre("CERROR", "EQ", this.bean.CERROR);
            }
            if(this.bean.IN_CARDC !== ''){
                this.buscarCampoLibre("ACARCOD", "EQ", this.bean.IN_CARDC);
            }
            if(this.bean.IN_MERCHN !== ''){
                this.buscarCampoLibre("MERCHN", "EQ", this.bean.IN_MERCHN);
            }
            if(this.bean.IN_COUNTRY !== ''){
                this.buscarCampoLibre("ACOUNTRY", "EQ", this.bean.IN_COUNTRY);
            }
            this.imgSearch_clickHandler();
	}
    },
    buscarCampoLibre: function (campo, operador, valor) {
        if(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo1').getValue() === ""){
            Ext.getCmp(prototype.MatchTkt.id+'-txtCampo1').setValue(this.getUserFieldCampo(campo));
            Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador1').setValue(operador);
            Ext.getCmp(prototype.MatchTkt.id+'-txtValue1').setValue(valor.trim());
		
	}else if(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo2').getValue() === ""){
            Ext.getCmp(prototype.MatchTkt.id+'-txtCampo2').setValue(this.getUserFieldCampo(campo));
            Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador2').setValue(operador);
            Ext.getCmp(prototype.MatchTkt.id+'-txtValue2').setValue(valor.trim());
		
	}else if(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo3').getValue() === ""){
            Ext.getCmp(prototype.MatchTkt.id+'-txtCampo3').setValue(this.getUserFieldCampo(campo));
            Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador3').setValue(operador);
            Ext.getCmp(prototype.MatchTkt.id+'-txtValue3').setValue(valor.trim());
		
	}else if(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo4').getValue() === ""){
            Ext.getCmp(prototype.MatchTkt.id+'-txtCampo4').setValue(this.getUserFieldCampo(campo));
            Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador4').setValue(operador);
            Ext.getCmp(prototype.MatchTkt.id+'-txtValue4').setValue(valor.trim());
		
	}else if(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo5').getValue() === ""){
            Ext.getCmp(prototype.MatchTkt.id+'-txtCampo5').setValue(this.getUserFieldCampo(campo));
            Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador5').setValue(operador);
            Ext.getCmp(prototype.MatchTkt.id+'-txtValue5').setValue(valor.trim());
		
	}else if(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo6').getValue() === ""){
            Ext.getCmp(prototype.MatchTkt.id+'-txtCampo6').setValue(this.getUserFieldCampo(campo));
            Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador6').setValue(operador);
            Ext.getCmp(prototype.MatchTkt.id+'-txtValue6').setValue(valor.trim());
		
	}else if(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo7').getValue() === ""){
            Ext.getCmp(prototype.MatchTkt.id+'-txtCampo7').setValue(this.getUserFieldCampo(campo));
            Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador7').setValue(operador);
            Ext.getCmp(prototype.MatchTkt.id+'-txtValue7').setValue(valor.trim());
		
	}
    },
    getUserFieldCampo: function (campo) {
        var objCampo;
	var campoA1248 = '';
	for(var c = 0; c < this.lstCampos.length; c++){
            objCampo = this.lstCampos[c];
            if (objCampo.SYSTFIELD.trim() === campo.trim()) {
                campoA1248 = objCampo.USERFIELD.trim();
                break;
            }
	}
	return campoA1248;
    },
    armandoSQL: function () {
        //Armando Query ===========================================
	var strSQL = '';
	var campo = '';
	var temp = '';
	var esCant = false;
	
	//=========================================================
	//Campo 1 =================================================
        if(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo1').isVisible()){
            campo = this.getCampoSql(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo1').getValue().toUpperCase());
	}else{
            campo = Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo1').getValue().toUpperCase();
	}
	if(campo !== '' && Ext.getCmp(prototype.MatchTkt.id+'-txtValue1').getValue() !== ''){
		
            if(campo === 'TICKET'){ 
                campo = 'CCIA||FORMA||SERIE';
            }
            temp = Ext.getCmp(prototype.MatchTkt.id+'-txtValue1').getValue().toUpperCase();

            if(esCant === true){
                strSQL += campo+" "+this.getConectorSql(Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador1').getValue(), Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador1'))+" "+temp+" ";
            }else{
                strSQL += campo+" "+this.getConectorSql(Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador1').getValue().text, Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador1'))+" '"+temp+"' ";
            }

            //Campo 2 =============================================
            esCant = false;
            if(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo2').isVisible()){				
                campo = this.getCampoSql(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo2').getValue().toUpperCase());
            }else{
                campo = Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo2').getValue().toUpperCase();
            }
            if(campo !== '' && Ext.getCmp(prototype.MatchTkt.id+'-txtValue2').getValue() !== ''){

                if(campo === 'TICKET'){ 
                    campo = 'CCIA||FORMA||SERIE';
                }
                temp = Ext.getCmp(prototype.MatchTkt.id+'-txtValue2').getValue().toUpperCase();

                if(esCant === true){
                    strSQL += Ext.getCmp(prototype.MatchTkt.id+'-cmbConector2').getValue().toUpperCase()+" "+campo+" " 
                   +this.getConectorSql(Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador2').getValue(), Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador2'))+" "+temp+" ";
                }else{
                    strSQL += Ext.getCmp(prototype.MatchTkt.id+'-cmbConector2').getValue().toUpperCase()+" "+campo+" " 
                   +this.getConectorSql(Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador2').getValue(), Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador2'))+" '"+temp+"' ";
                }

                //Campo 3 =========================================
                esCant = false;
                if(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo3').isVisible()){				
                    campo = this.getCampoSql(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo3').getValue().toUpperCase());
                }else{
                    campo = Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo3').getValue().toUpperCase();
                }
                if(campo !== '' && Ext.getCmp(prototype.MatchTkt.id+'-txtValue3').getValue() !== ''){

                    if(campo === 'TICKET'){
                        campo = 'CCIA||FORMA||SERIE';
                    }
                    temp = Ext.getCmp(prototype.MatchTkt.id+'-txtValue3').getValue().toUpperCase();

                    if(esCant === true){
                        strSQL += Ext.getCmp(prototype.MatchTkt.id+'-cmbConector3').getValue().toUpperCase()+" "+campo+" " 
                       +this.getConectorSql(Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador3').getValue(), Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador3'))+" "+temp+" ";
                    }else{
                        strSQL += Ext.getCmp(prototype.MatchTkt.id+'-cmbConector3').getValue().toUpperCase()+" "+campo+" " 
                       +this.getConectorSql(Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador3').getValue(), Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador3'))+" '"+temp+"' ";
                    }


                    //Campo 4 ====================================
                    esCant = false;
                    if(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo3').isVisible()){				
                        campo = this.getCampoSql(Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo3').getValue().toUpperCase());
                    }else{
                        campo = Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo4').getValue().toUpperCase();
                    }
                    if(campo !== '' && Ext.getCmp(prototype.MatchTkt.id+'-txtValue4').getValue() !== ''){

                        if(campo === 'TICKET'){ 
                            campo = 'CCIA||FORMA||SERIE';
                        }
                        temp = Ext.getCmp(prototype.MatchTkt.id+'-txtValue4').getValue().toUpperCase();

                        if(esCant === true){
                            strSQL += Ext.getCmp(prototype.MatchTkt.id+'-cmbConector4').getValue().toUpperCase()+" "+campo+" " 
                           +this.getConectorSql(Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador4').getValue(), Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador4'))+" "+temp+" ";
                        }else{
                            strSQL += Ext.getCmp(prototype.MatchTkt.id+'-cmbConector4').getValue().toUpperCase()+" "+campo+" " 
                           +this.getConectorSql(Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador4').getValue(), Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador4'))+" '"+temp+"' ";
                        }

                        //Campo 5 =================================
                        esCant = false;
                        if(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo5').isVisible()){
                            campo = this.getCampoSql(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo5').getValue().toUpperCase());
                        }else{
                            campo = Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo5').getValue().toUpperCase();
                        }
                        if(campo !== '' && Ext.getCmp(prototype.MatchTkt.id+'-txtValue5').getValue() !== ''){

                            if(campo === 'TICKET'){ 
                                campo = 'CCIA||FORMA||SERIE';
                            }
                            temp = Ext.getCmp(prototype.MatchTkt.id+'-txtValue5').getValue().toUpperCase();

                            if(esCant === true){
                                strSQL += Ext.getCmp(prototype.MatchTkt.id+'-cmbConector5').getValue().toUpperCase()+" "+campo+" " 
                               +this.getConectorSql(Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador5').getValue(), Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador5'))+" "+temp+" ";
                            }else{
                                strSQL += Ext.getCmp(prototype.MatchTkt.id+'-cmbConector5').getValue().toUpperCase()+" "+campo+" " 
                               +this.getConectorSql(Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador5').getValue(), Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador5'))+" '"+temp+"' ";
                            }

                            //Campo 6 =============================
                            esCant = false;
                            if(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo6').isVisible()){
                                campo = this.getCampoSql(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo6').getValue().toUpperCase());
                            }else{
                                campo = Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo6').getValue().toUpperCase();
                            }
                            if(campo !== '' && Ext.getCmp(prototype.MatchTkt.id+'-txtValue6').getValue() !== ''){

                                if(campo === 'TICKET'){ 
                                    campo = 'CCIA||FORMA||SERIE';
                                }
                                temp = Ext.getCmp(prototype.MatchTkt.id+'-txtValue6').getValue().toUpperCase();

                                if(esCant === true){
                                    strSQL += Ext.getCmp(prototype.MatchTkt.id+'-cmbConector6').getValue().toUpperCase()+" "+campo+" " 
                                   +this.getConectorSql(Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador6').getValue(), Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador6'))+" "+temp+" ";
                                }else{
                                    strSQL += Ext.getCmp(prototype.MatchTkt.id+'-cmbConector6').getValue().toUpperCase()+" "+campo+" " 
                                   +this.getConectorSql(Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador6').getValue(), Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador6'))+" '"+temp+"' ";
                                }

                                //Campo 7 =========================
                                esCant = false;
                                if(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo7').isVisible()){
                                    campo = this.getCampoSql(Ext.getCmp(prototype.MatchTkt.id+'-txtCampo7').getValue().toUpperCase());
                                }else{
                                    campo = Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo7').getValue().toUpperCase();
                                }
                                if(campo !== '' && Ext.getCmp(prototype.MatchTkt.id+'-txtValue7').getValue() !== ''){

                                    if(campo === 'TICKET'){ 
                                        campo = 'CCIA||FORMA||SERIE';
                                    }
                                    temp = Ext.getCmp(prototype.MatchTkt.id+'-txtValue7').getValue().toUpperCase();

                                    if(esCant === true){
                                        strSQL += Ext.getCmp(prototype.MatchTkt.id+'-cmbConector7').getValue().toUpperCase()+" "+campo+" " 
                                       +this.getConectorSql(Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador7').getValue(), Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador7'))+" "+temp+" ";
                                    }else{
                                        strSQL += Ext.getCmp(prototype.MatchTkt.id+'-cmbConector7').getValue().toUpperCase()+" "+campo+" " 
                                       +this.getConectorSql(Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador7').getValue(), Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador7'))+" '"+temp+"' ";
                                    }
                                }
                                //=================================
                            }
                            //=====================================
                        }
                        //=========================================
                    }
                    //=============================================
                }
                //=================================================
            }
            //=====================================================
		
	}
	return strSQL;
    },
    getCampoSql: function (campo) {
        var objCampo;
	var campoA1248 = '';
	for(var c = 0; c < this.lstCampos.length; c++){
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
    validarFecha: function () {
        var msg = '';
	
        if(Ext.getCmp(prototype.MatchTkt.id+'-cmbDateFromDay').getValue() !== undefined){
		
            var fday = Ext.getCmp(prototype.MatchTkt.id+'-cmbDateFromDay').getValue();
            var tday = Ext.getCmp(prototype.MatchTkt.id+'-cmbDateToDay').getValue();
	    
	    if(fday !== '' && tday !== ''){
	        if(Ext.getCmp(prototype.MatchTkt.id+'-cmbDateMonth').getValue() === '' || Ext.getCmp(prototype.MatchTkt.id+'-cmbDateYear').getValue() === ''){
                    msg = 'You must choose a month and a year.';
	        }
	    }
	}
	return msg;
    },
    //<editor-fold defaultstate="collapsed" desc="obtainDataCombo">
    obtainDataCombo: function () {
        var me1 = this;
        Ext.Ajax.request({
            url: prototype.MatchTkt.url+'/obtainDataCombo',
            method: 'POST',
            timeout: 60000000,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var store;
                    me1.lstConditions = res.lstOperTkt;
                    // <editor-fold defaultstate="collapsed" desc="cargar operadores">
                    var operadores = new Array();
                    operadores.push(['', 'All']);
                    me1.lstConditions.forEach(function callback(currentValue, index, array) {
                        operadores.push([currentValue.USERFIELD, currentValue.USERFIELD]);
                    });
                    store = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'operadores', autoLoad: true, data: operadores, fields: ['code', 'name']
                    });
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador1').bindStore(store);
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador2').bindStore(store);
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador3').bindStore(store);
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador4').bindStore(store);
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador5').bindStore(store);
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador6').bindStore(store);
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador7').bindStore(store);
                    
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador1').setValue("");
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador2').setValue("");
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador3').setValue("");
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador4').setValue("");
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador5').setValue("");
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador6').setValue("");
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbOperador7').setValue("");
                    // </editor-fold>
            
                    me1.lstCampos = res.lstCamposTkt;
                    // <editor-fold defaultstate="collapsed" desc="cargar campos">
                    var campos = new Array();
                    campos.push(['', 'All']);
                    me1.lstCampos.forEach(function callback(currentValue, index, array) {
                        campos.push([currentValue.SYSTFIELD, currentValue.USERFIELD+' - '+currentValue.DESCRIPT]);
                    });
                    store = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'campos', autoLoad: true, data: campos, fields: ['code', 'name']
                    });
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo1').bindStore(store);
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo2').bindStore(store);
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo3').bindStore(store);
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo4').bindStore(store);
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo5').bindStore(store);
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo6').bindStore(store);
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo7').bindStore(store);
                    
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo1').setValue("");
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo2').setValue("");
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo3').setValue("");
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo4').setValue("");
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo5').setValue("");
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo6').setValue("");
                    Ext.getCmp(prototype.MatchTkt.id+'-cmbCampo7').setValue("");
                    // </editor-fold>
                    
                    me1.mostrarData();
                } else global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.salesAudit.GridData', {
            proxy: {
                url: prototype.MatchTkt.url+'/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    win.lblUser_toolTip("Estructura: A2290");
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (success) {
                        
                        if (obj.data.length > 0) {
                            var beanDet = obj.data.items[0].data;
                            
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.MatchTkt.id+'-gridDetTicket').bindStore(storeGridDatas);
        Ext.getCmp(prototype.MatchTkt.id+'-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="matchManual">
    matchManual: function (bean) {
        Ext.Ajax.request({
            url: prototype.MatchTkt.url+'/matchManual',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp('ProMatchTktForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('ProMatchTktForm').unmask();
                win.lblUser_toolTip("Estructura: A2290");
                var res = Ext.JSON.decode(response.responseText);
//                if (res.success) {
                    var msj = res.msjOption;
                    global.Msg({msg: msj});
//                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('ProMatchTktForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="execApply">
    execApply: function (bean) {
        Ext.Ajax.request({
            url: prototype.MatchTkt.url+'/execApply',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp('ProMatchTktForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('ProMatchTktForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msj = res.Mensaje;
                    global.Msg({msg: msj});
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('ProMatchTktForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    
    
     gridData_VIEWTKT_clickHandler: function (column, e, row, column, x, rowData) {
        this.view.close();
        var data = x.record.data;
        var strTkt = data.strTicket;
        this.beanProMasterTicket = {};
        this.beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        this.beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        this.beanProMasterTicket.IN_SERIE = strTkt.substr(8, 6);
        this.beanProMasterTicket.IN_SEQ = '00';
         
//        prototypeProgram.view = 'payments-sales-reconciliation-form';
//        prototypeProgram.nprog = 'PX00000263';
//        prototypeProgram.title = 'Sales Reconciliation by Ticket';
//        prototypeProgram.modulo = ''; 

        win.displayProMasterTicket(this, 'ViewConciliation', this.beanProMasterTicket);
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        Ext.getCmp(prototype.MatchTkt.id+'-paggin').moveFirst();
    },
    pagPrevious: function(obj, e) {
        Ext.getCmp(prototype.MatchTkt.id+'-paggin').movePrevious();
    },
    pagNext: function(obj, e) {
        Ext.getCmp(prototype.MatchTkt.id+'-paggin').moveNext();
    },
    pagLast: function(obj, e) {
        Ext.getCmp(prototype.MatchTkt.id+'-paggin').moveLast();
    },
    // </editor-fold>

    selectedChild: function(box) {
        if(!win.visible(box)) {
            this.stack.push(prototype.MatchTkt.id+'-'+box);
            global.selectedChild(this.childs, prototype.MatchTkt.id+'-'+box);
        }
        var paggin = this.getPaggin();
        if (paggin === null) {
            win.visible('boxPaginacion', false);
            win.visible('boxPagDetail', false);
        } else {
            //<editor-fold defaultstate="collapsed" desc="setPaggin">
            var pagData = paggin.getPageData();
            
            var currentPage = win.formatLngNumber(pagData.currentPage);
            var pageCount = win.formatLngNumber(pagData.pageCount);
            var total = win.formatLngNumber(pagData.total);
            
            win.setText('lblPagActual', currentPage);
            win.setText('lblPagTotal', pageCount);
            win.setText('lblRowsTotal', total);
            //</editor-fold>
            win.visible('boxPaginacion', true);
            win.visible('boxPagDetail', true);

            var width = 0, wt;
            var boxChild = Ext.getCmp(prototype.MatchTkt.id+'-'+box).items.items;
            for (var i = 0; i < boxChild.length; i++) {
                wt = boxChild[i].getWidth();
                if (wt > width) {
                    width = wt;
                }
            }
            Ext.getCmp(prototype.MatchTkt.id+'-boxPagDetail').setWidth(width);
        }
    },
    getPaggin: function() {
        switch (this.peek()) {
            case prototype.MatchTkt.id+'-boxMainData': return Ext.getCmp(prototype.MatchTkt.id+'-paggin');
            default: return null;
        }
    },
    peek: function() {
        if (this.stack.length > 0) {
            return this.stack[this.stack.length - 1];
        } else
            return "";
    }
});


