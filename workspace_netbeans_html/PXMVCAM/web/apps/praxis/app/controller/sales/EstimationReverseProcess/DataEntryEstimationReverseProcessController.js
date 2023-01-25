Ext.define('Ext.Praxis.controller.sales.EstimationReverseProcess.DataEntryEstimationReverseProcessController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryEstimationReverseProcessController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    me2: '',
    p: {},
    indexConta: 0,
    // </editor-fold>
    init: function(view) {
        me2 = this;
        this.p = this.view.params;
        this.setStoreData();
    },
    afterRender: function(){
//        switch( this.p.actionCode ){
//            case 'I':
//                Ext.getCmp(prototype.id+'-btn-save').show();
//                Ext.getCmp(prototype.id+'-btn-update').hide();
//                Ext.getCmp(prototype.id+'-btn-delete').hide();
//                this.limpiarData();
//                this.setValue('txtGroup', this.p.grupo);
//                this.setValue('txtCurrency', 'USD');
//                this.mostrarCuentas();
//                break;
//            case 'U':
//                console.log(this.p);
//                var storeGridData = Ext.create("Ext.Praxis.store.interline.GridData", { data: this.p.lstConta });
//                Ext.getCmp(prototype.id + '-gvwConta').bindStore(storeGridData);
//                Ext.getCmp(prototype.id+'-btn-save').hide();
//                Ext.getCmp(prototype.id+'-btn-update').show();
//                Ext.getCmp(prototype.id+'-btn-delete').show();
//                this.limpiarData();
//                this.mostrarData();
//                break;
//        }
        Ext.getCmp(prototype.id + '-cboType').bindStore(this.p.listType);
        this.setValue('cboType', {});
    },
    setStoreData: function() {
        //<editor-fold defaultstate="collapsed" desc="cmbDateYear2">
        var i = 2008, fecha = new Date(), year = fecha.getFullYear() + 1, years = new Array();
        years.push(['', '----']);
        for (; year >= i; year--) years.push([year, year]);
       
        var storeComboDataYear = Ext.create('Ext.data.ArrayStore', {
            storeId: 'year',
            autoLoad: true,
            data: years,
            fields: ['code', 'name']
        });
        Ext.getCmp(prototype.id+'-cmbDateYear2').bindStore(storeComboDataYear);
        //</editor-fold>

        //<editor-fold defaultstate="collapsed" desc="cmbDateMonth2">
        i = 0; var month = new Array();
        month.push(['', '--']);
        month.push(
                ["01", "Jan"],
                ["02", "Feb"],
                ["03", "Mar"],
                ["04", "Apr"],
                ["05", "May"],
                ["06", "Jun"],
                ["07", "Jul"],
                ["08", "Aug"],
                ["09", "Sep"],
                ["10", "Oct"],
                ["11", "Nov"],
                ["12", "Dec"]
                );
        var storeComboDataMonth = Ext.create('Ext.data.ArrayStore', {
            storeId: 'filter',
            autoLoad: true,
            data: month,
            fields: ['code', 'name']
        });
        Ext.getCmp(prototype.id+'-cmbDateMonth2').bindStore(storeComboDataMonth);
        //</editor-fold>
    },
    //<editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function () {
        this.setValue('cbxSource2', this.p.bean.A2134FUENT);
        this.setValue('txtCurrency', this.p.bean.A2134MDA);
        var strClearence = this.p.bean.A2134FPROC;
        
        var arrFecha = strClearence.split("/");
        
        this.setValue('cmbDateYear2', arrFecha[0]);
        
        this.setValue('cmbDateMonth2', arrFecha[1]);
        
        this.setValue('txtPeriodo2', arrFecha[2]);
        
        this.setValue('txtGroup', this.p.bean.A2134GRUPO);
        this.setValue('txtAccountingDate', this.p.bean.A2134FCONT);
        this.setValue('chkClose', this.p.bean.A2134SPROC==='C'? true : false);
        
        this.setValue('txtUSCR', this.p.bean.A2134USRIN);
        this.setValue('txtFECR', this.p.bean.A2134FECIN);
        this.setValue('txtHOCR', this.p.bean.A2134HORIN);
        this.setValue('txtUSUP', this.p.bean.A2134USRAC);
        this.setValue('txtFEUP', this.p.bean.A2134FECAC);
        this.setValue('txtHOUP', this.p.bean.A2134HORAC);
        
        Ext.getCmp(prototype.id + '-lblA2134GRUPO_OLD').setText(this.p.bean.A2134GRUPO);
        
        Ext.getCmp(prototype.id + '-btn-update').setVisible(this.p.bloqueo === 'C' ? false : true);
        Ext.getCmp(prototype.id + '-btn-delete').setVisible(this.p.bloqueo === 'C' ? false : true);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanOption) {
        //Input para llenar el BEAN que se enviara al Store Procedure
   	beanOption.IN_A2134CCUST = '139';
	beanOption.IN_A2134FUENT = this.getValue("cbxSource2");
	beanOption.IN_A2134PSVTA = '';//(txtCountry.visible==false ? 'US' : app.trim(txtCountry.text));
	beanOption.IN_A2134SFUEN = '';//(txtChannel.visible==false ? cbxSource.selectedItem.data : app.trim(txtChannel.text));
	beanOption.IN_A2134MDA = this.getValue("txtCurrency");
	beanOption.IN_A2134MODO = 'E';

        var strPeriodo = this.getValue("txtPeriodo2").length === 2 ? "" : "0";
        strPeriodo += this.getValue("txtPeriodo2");
	var strClearance = this.getValue("cmbDateYear2") + this.getValue("cmbDateMonth2") + strPeriodo;

	beanOption.IN_A2134FPROC = strClearance;
	beanOption.IN_A2134GRUPO = this.getValue("txtGroup");
	beanOption.IN_A2134STPRO = '0';
	beanOption.IN_A2134FCONT = Ext.util.Format.date(this.getValue('txtAccountingDate'), 'Ymd');
	beanOption.IN_A2134SPROC = (this.getValue("chkClose") === true ? 'C' : 'O');
        beanOption.ESTIMADOS = new Array();
        //LLenar Cuentas
	for(var i = 0;i<this.p.lstConta.length;i++)
	{
            var beanCuenta = {};
            beanCuenta = this.p.lstConta[i];
            beanCuenta.A2135FUENT = this.getValue("cbxSource2");
            beanCuenta.A2135PAIS = (Ext.getCmp(prototype.id + '-txtCountry2').isVisible()===false ? 'US' : this.getValue("txtCountry2"));
            beanCuenta.A2135SUBFU = this.getValue("txtChannel2");
            beanCuenta.A2135CUR	= (Ext.getCmp(prototype.id + '-txtCurrency').isVisible()===false ? 'USD' : this.getValue("txtCurrency"));
            beanCuenta.A2135FPRO = strClearance;
            beanCuenta.A2135FCONT = Ext.util.Format.date(this.getValue('txtAccountingDate'), 'Ymd');
            
            if(beanCuenta.A2135ACTIV + beanCuenta.A2135PASIV >1)beanOption.ESTIMADOS.push(beanCuenta);
	}
        
        beanOption.IN_A2134GRUPO_OLD = this.getValue("txtGroup"); //app.trim(lblA2134GRUPO_OLD.text);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
        this.setValue('txtGroup', '');
        this.setValue('txtPeriodo2', '');
        this.setValue('txtAccountingDate', '');
        this.setValue('txtChannel2', '');
        this.setValue('txtCountry2', '');
        this.setValue('txtCurrency', '');
        this.setValue('txtA2135TITU', '');
        this.setValue('txtA2135CIA', '');
        this.setValue('txtA2135UNIDA', '');
        this.setValue('txtA2135CECOS', '');
        this.setValue('txtA2135UBICA', '');
        this.setValue('txtA2135CTA', '');
        this.setValue('txtA2135SCTA', '');
        this.setValue('txtA2135EQUI', '');
        this.setValue('txtA2135ICIA', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSCR', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
        this.setValue('txtUSUP', '');
        
        this.setValue('cmbDateYear2', '');
        this.setValue('cmbDateMonth2', '');
        
        if(this.p.actionCode !== 'U'){
            Ext.getCmp(prototype.id+'-gvwConta').getStore().removeAll();
	}
    },
    //</editor-fold>
    mostrarCuentas: function() {
        this.p.lstConta = new Array();
        for (var i = 0; i < this.p.lstContaA1740.length; i++) {
            var store = Ext.getCmp(prototype.id + '-gvwConta').getStore();
            var dato = this.p.lstContaA1740[i];
            var obj = {};
            var fila = store.data.length;
            obj.A2135TITRA= dato.A1740TITRA;
            obj.A2135TIPO = dato.A1740TIPO;
            obj.A2135SUBTI = dato.A1740SUBTI;
            obj.A2135CATEG = dato.A1740CATEG;
            obj.A2135CIAF = dato.A1740CIA;
            obj.A2135UNID = dato.A1740UNIDA;
            obj.A2135CECO = dato.A1740CECOS;
            obj.A2135UBICA = dato.A1740UBICA;
            obj.A2135CUENT = dato.A1740CTA;
            obj.A2135SUBCU = dato.A1740SCTA;
            obj.A2135EQUI = dato.A1740EQUI;
            obj.A2135ICIA = dato.A1740ICIA;
            obj.A2135TITU = dato.A1740CLIE;
            obj.A2135ACTIV = 0;
            obj.A2135PASIV = 0;
            obj.A2135CUENTA = dato.A1740CIA +' - '+ dato.A1740UNIDA +' - '+ dato.A1740CECOS + ' - '+ dato.A1740UBICA +' - '+
            dato.A1740CTA +' - '+ dato.A1740SCTA +' - '+ dato.A1740EQUI +' - '+ dato.A1740ICIA;

            store.insert(fila, obj);
            this.p.lstConta.push(obj);
        }
    },
    truncate: function(cmp, e, eOpts) {
        var value = cmp.getValue().replace(/,/g, '');
        cmp.setValue(Ext.util.Format.number(value, '0,000.00'));
    },
    cboType_change: function () {
        var beanA1740 = this.getValue("cboType");
        if (beanA1740.A1740CIA !== '' && (beanA1740.A1740UBICA !== '' || beanA1740.A1740CECOS === '')) {
            Ext.getCmp(prototype.id + '-txtA2135UBICA').setReadOnly(true);
            Ext.getCmp(prototype.id + '-txtA2135CECOS').setReadOnly(true);
        } else {
            Ext.getCmp(prototype.id + '-txtA2135UBICA').setReadOnly(false);
            Ext.getCmp(prototype.id + '-txtA2135CECOS').setReadOnly(false);
        }
        this.setValue('txtA2135TITU', beanA1740.A1740CLIE);
        this.setValue('txtA2135CIA', beanA1740.A1740CIA);
        this.setValue('txtA2135UNIDA', beanA1740.A1740UNIDA);
        this.setValue('txtA2135CECOS', beanA1740.A1740CECOS);
        this.setValue('txtA2135UBICA', beanA1740.A1740UBICA);
        this.setValue('txtA2135CTA', beanA1740.A1740CTA);
        this.setValue('txtA2135SCTA', beanA1740.A1740SCTA);
        this.setValue('txtA2135EQUI', beanA1740.A1740EQUI);
        this.setValue('txtA2135ICIA', beanA1740.A1740ICIA);
        
        this.setValue('lblA1740TITRA', beanA1740.A1740TITRA);
        this.setValue('lblA1740TIPO', beanA1740.A1740TIPO);
        this.setValue('lblA1740SUBTI', beanA1740.A1740SUBTI);
        this.setValue('lblA1740CATEG', beanA1740.A1740CATEG);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    //<editor-fold defaultstate="collapsed" desc="btnInsert_clickHandler">
    btnInsert_clickHandler: function () {
        if (this.validaRequiredFields()) {
            if (this.p.lstConta.length > 0) {
                var activo = 0;
                var pasivo = 0;
                var blanco = false;
                for (var i = 0; i < this.p.lstConta.length; i++) {
                    var dato = this.p.lstConta[i];
                    activo += Number(dato.A2135ACTIV);
                    pasivo += Number(dato.A2135PASIV);
                }
                pasivo = Number(Ext.util.Format.number(pasivo, '0.00'));
                activo = Number(Ext.util.Format.number(activo, '0.00'));
                if(pasivo !== activo) {
                    global.Msg({msg: 'Difference between debit and credit.'+ pasivo +'-' + activo});
                    return ;
                } else if(pasivo + activo<1) {
                    global.Msg({msg: 'Enter amount in some accounts.'});
                    return ;
                } else {
                    var mensaje = '';
                    if(this.getValue("txtCurrency")==='USD') mensaje='Are you sure to insert?';
                    else mensaje='Are you sure to insert in currency '+ this.getValue("txtCurrency")+'?';
                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: mensaje,
                        buttons: Ext.MessageBox.OKCANCEL,
                        scope: this,
                        icon: Ext.MessageBox.QUESTION,
                        modal: true,
                        fn: function(btn) {
                            if (btn === 'ok') {
                                var beanOption = {};
                                this.llenarData(beanOption);
                                this.CRUD(beanOption, 'I');
                            }
                        }
                    });
                }
            } else {
                global.Msg({msg: 'Register at least one account.'});
            }
        } else {
            global.Msg({msg: 'Register at least one account.'});
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="btnUpdate_clickHandler">
    btnUpdate_clickHandler: function () {
        if (this.validaRequiredFields()) {
            if (this.p.lstConta.length > 0) {
                var activo = 0;
                var pasivo = 0;
                var blanco = false;
                for (var i = 0; i < this.p.lstConta.length; i++) {
                    var dato = this.p.lstConta[i];
                    activo += Number(dato.A2135ACTIV);
                    pasivo += Number(dato.A2135PASIV);
                }
                pasivo = Number(Ext.util.Format.number(pasivo, '0.00'));
                activo = Number(Ext.util.Format.number(activo, '0.00'));
                if(pasivo !== activo) {
                    global.Msg({msg: 'Difference between debit and credit.'});
                    return ;
                } else if(pasivo + activo<1) {
                    global.Msg({msg: 'Enter amount in some accounts.'});
                    return ;
                } else {
                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: 'Are you sure to update?',
                        buttons: Ext.MessageBox.OKCANCEL,
                        scope: this,
                        icon: Ext.MessageBox.QUESTION,
                        modal: true,
                        fn: function(btn) {
                            if (btn === 'ok') {
                                var beanOption = {};
                                this.llenarData(beanOption);
                                this.limpiarData();
                                this.CRUD(beanOption, 'U');
                            }
                        }
                    });
                }
            } else {
                global.Msg({msg: 'Register at least one account.'});
            }
        } else {
            global.Msg({msg: 'Insert fields required.'});
        }
    },
    //</editor-fold>
    btnDelete_clickHandler: function () {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    var beanOption = {};
                    this.llenarData(beanOption);
                    this.CRUD(beanOption, 'D');
                }
            }
        });
    },
    //<editor-fold defaultstate="collapsed" desc="btnAddAccount_clickHandler">
    btnAddAccount_clickHandler: function (btn) {
        if(this.getValue('txtA2135ACTIV').length === 0 || this.getValue('txtA2135PASIV').length === 0 ||
            this.getValue('txtA2135CIA')==='' || this.getValue('txtA2135UNIDA')==='' || this.getValue('txtA2135CECOS')==='' ||
            this.getValue('txtA2135UBICA')==='' || this.getValue('txtA2135CTA')==='' || this.getValue('txtA2135SCTA')==='' ||
            this.getValue('txtA2135EQUI')==='' || this.getValue('txtA2135ICIA')===''){
                 global.Msg({msg: 'Please enter all the attributes.'});
                 return;
         }
         var objPre = {};
         
         if (btn.id.includes('btnUpdateAccount')) {
            if (this.validaRequiredFields()) {
                objPre = this.p.lstConta[this.indexConta];
            } else {
                global.Msg({msg: 'Insert fields required.'});
                return ;
            }
        }
        objPre.A2135GRUPO = this.getValue("txtGroup");
        objPre.A2135PAIS = '';//app.trim(txtCountry.text);
        objPre.A2135FUENT = this.getValue("cbxSource2");
        objPre.A2135SUBFU = '';//app.trim(txtChannel.text);
        objPre.A2135CUR = this.getValue("txtCurrency");
        objPre.A2135FP = '';
        objPre.A2135MODO = 'E';
        var strPeriodo = this.getValue("txtPeriodo2").length === 2 ? "" : "0";
	strPeriodo += this.getValue("txtPeriodo2");
        objPre.A2135FPRO = this.getValue("cmbDateYear2") + this.getValue("cmbDateMonth2") + strPeriodo;
        objPre.A2135FCONT = Ext.util.Format.date(this.getValue('txtAccountingDate'), 'Ymd');
        objPre.A2135TITU = this.getValue("txtA2135TITU");
        objPre.A2135CIAF = this.getValue("txtA2135CIA");
        objPre.A2135UNID = this.getValue("txtA2135UNIDA");
        objPre.A2135CECO = this.getValue("txtA2135CECOS");
        objPre.A2135UBICA= this.getValue("txtA2135UBICA");
        objPre.A2135CUENT = this.getValue("txtA2135CTA");
        objPre.A2135SUBCU = this.getValue("txtA2135SCTA");
        objPre.A2135EQUI = this.getValue("txtA2135EQUI");
        objPre.A2135ICIA = this.getValue("txtA2135ICIA");
        objPre.A2135CUENTA =
            this.getValue("txtA2135CIA") +' - '+ this.getValue("txtA2135UNIDA") +' - '+
            this.getValue("txtA2135CECOS") +' - '+ this.getValue("txtA2135UBICA") +' - '+
            this.getValue("txtA2135CTA") +' - '+ this.getValue("txtA2135SCTA") +' - '+
            this.getValue("txtA2135EQUI") +' - '+ this.getValue("txtA2135ICIA");
        
        objPre.A2135ACTIV = Number(this.getValue("txtA2135ACTIV").replace(/,/g, ''));
        objPre.A2135PASIV = Number(this.getValue("txtA2135PASIV").replace(/,/g, ''));
        
        objPre.A2135TITRA = this.getValue("lblA1740TITRA");
        objPre.A2135TIPO = this.getValue("lblA1740TIPO");
        objPre.A2135SUBTI = this.getValue("lblA1740SUBTI");
        objPre.A2135CATEG = this.getValue("lblA1740CATEG");
        this.btnCancelAccount_clickHandler();
        if (btn.id.includes('btnAddAccount')) {
            if (this.validaRequiredFields()) {
                var duplicado = '';
                for (var i = 0; i < this.p.lstConta.length; i++) {
                    var dato = this.p.lstConta[i];
                    if((objPre.A2135TITRA + objPre.A2135TIPO + objPre.A2135SUBTI +objPre.A2135CATEG)==
                        (dato.A2135TITRA + dato.A2135TIPO + dato.A2135SUBTI +dato.A2135CATEG)) {
                        duplicado='C';
                        break;
                    }
                }
                if (duplicado==='') {
                    this.p.lstConta.push(objPre);
                } else {
                    global.Msg({msg: 'Record already exists.'});
                }
            } else {
                global.Msg({msg: 'Insert fields required.'});
            }
        }
        Ext.getCmp(prototype.id + '-gvwConta').bindStore(
            Ext.create("Ext.Praxis.store.interline.GridData", { data: this.p.lstConta })
        );
    },
    //</editor-fold>
    gvwConta_editClickHandler: function (obj, nRow, nColumn, column, x, rowData) {
        var data = x.record.data;
        this.indexConta = nRow;
        if(data.A2135CIAF !=='' && (data.A2135UBICA==='' || data.A2135CECO==='')) {
            Ext.getCmp(prototype.id + '-txtA2135UBICA').setReadOnly(false);
            Ext.getCmp(prototype.id + '-txtA2135CECOS').setReadOnly(false);
        } else {
            Ext.getCmp(prototype.id + '-txtA2135UBICA').setReadOnly(true);
            Ext.getCmp(prototype.id + '-txtA2135CECOS').setReadOnly(true);
        }
        this.setValue('txtA2135ACTIV', Ext.util.Format.number(data.A2135ACTIV, '0,000.00'));
        this.setValue('txtA2135PASIV', Ext.util.Format.number(data.A2135PASIV, '0,000.00'));
        this.setValue('txtA2135CIA', data.A2135CIAF);
        this.setValue('txtA2135UNIDA', data.A2135UNID);
        this.setValue('txtA2135CECOS', data.A2135CECO);
        this.setValue('txtA2135UBICA', data.A2135UBICA);
        this.setValue('txtA2135CTA', data.A2135CUENT);
        this.setValue('txtA2135SCTA', data.A2135SUBCU);
        this.setValue('txtA2135EQUI', data.A2135EQUI);
        this.setValue('txtA2135ICIA', data.A2135ICIA);
        this.setValue('txtA2135TITU', data.A2135TITU);
        
        this.setValue('lblA1740TITRA', data.A2135TITRA);
        this.setValue('lblA1740TIPO', data.A2135TIPO);
        this.setValue('lblA1740SUBTI', data.A2135SUBTI);
        this.setValue('lblA1740CATEG', data.A2135CATEG);
        
        Ext.getCmp(prototype.id + '-btnUpdateAccount').show();
        Ext.getCmp(prototype.id + '-btnCancelAccount').show();
        Ext.getCmp(prototype.id + '-btnAddAccount').hide();
        this.focus('cboType');
    },
    gvwConta_removeClickHandler: function (obj, nRow, nColumn) {
        this.p.lstConta.splice(nRow,1);
        Ext.getCmp(prototype.id + '-gvwConta').bindStore(
            Ext.create("Ext.Praxis.store.interline.GridData", { data: this.p.lstConta })
        );
        if (this.p.lstConta.length === 0) this.btnCancelAccount_clickHandler();
    },
    btnCancelAccount_clickHandler: function() {
        Ext.getCmp(prototype.id + '-btnAddAccount').show();
        Ext.getCmp(prototype.id + '-btnUpdateAccount').hide();
        Ext.getCmp(prototype.id + '-btnCancelAccount').hide();
        
        Ext.getCmp(prototype.id + '-txtA2135UBICA').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtA2135CECOS').setReadOnly(true);
        
        this.setValue('txtA2135TITU', '');
        this.setValue('txtA2135CIA', '');
        this.setValue('txtA2135UNIDA', '');
        this.setValue('txtA2135CECOS', '');
        this.setValue('txtA2135UBICA', '');
        this.setValue('txtA2135CTA', '');
        this.setValue('txtA2135SCTA', '');
        this.setValue('txtA2135EQUI', '');
        this.setValue('txtA2135ICIA', '');
        this.setValue('lblA1740TITRA', '');
        this.setValue('lblA1740TIPO', '');
        this.setValue('lblA1740SUBTI', '');
        this.setValue('lblA1740CATEG', '');
        this.setValue('txtA2135ACTIV', '0.00');
        this.setValue('txtA2135PASIV', '0.00');
        this.setValue('cboType', {});
        this.focus('cboType');
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    // </editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="CRUD">
    CRUD: function (beanOption, strOption) {
        Ext.Ajax.request({
            url: prototype.url + '/CRUD',
            method: 'POST',
            timeout: 60000000,
            params: { strOption: strOption, beanString: JSON.stringify(beanOption) },
            beforerequest: Ext.getCmp('DataEntryEstimationReverseAPForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryEstimationReverseAPForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: res.intResult,
                        buttons: Ext.MessageBox.YES,
                        scope: this,
                        icon: Ext.MessageBox.INFO,
                        modal: true,
                        fn: function(btn) {
                            if (btn === 'yes') {
                                me2.view.close();
                            }
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        }
                    });
                } else global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp('DataEntryEstimationReverseAPForm').unmask();
            }
        });
    },
    //</editor-fold>
    validaRequiredFields: function () {
        var bvalida = true;
        if (this.getValue("cmbDateYear2")==='' || this.getValue("cmbDateMonth2")==='' ||
            this.getValue("txtPeriodo2")==='' || Ext.util.Format.date(this.getValue('txtAccountingDate'), 'Ymd')==='') {
                bvalida = false;
        }
        return bvalida;
    },
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    }
    // </editor-fold>
});