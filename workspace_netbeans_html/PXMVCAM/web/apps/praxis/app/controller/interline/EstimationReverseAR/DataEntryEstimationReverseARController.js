Ext.define('Ext.Praxis.controller.interline.EstimationReverseAR.DataEntryEstimationReverseARController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryEstimationReverseARController',
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
        switch( this.p.actionCode ){
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                this.limpiarData();
                this.setValue('txtGroup', this.p.grupo);
                this.setValue('txtCurrency', 'USD');
                this.mostrarCuentas();
                break;
            case 'U':
                var storeGridData = Ext.create("Ext.Praxis.store.interline.GridData", { data: this.p.lstConta });
                Ext.getCmp(prototype.id + '-gvwConta').bindStore(storeGridData);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').show();
                Ext.getCmp(prototype.id+'-btn-delete').show();
                this.limpiarData();
                this.mostrarData();
                break;
        }
        Ext.getCmp(prototype.id + '-cboType').bindStore(this.p.listType);
        this.setValue('cboType', {});
        // global.AccessControlMaganer();
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
        this.setValue('cbxSource2', this.p.bean.A2111FUENT);
        this.setValue('txtCurrency', this.p.bean.A2111MDA);
        var strClearence = this.p.bean.A2111FPROC;
        
        var arrFecha = strClearence.split("/");
        
        this.setValue('cmbDateYear2', arrFecha[0]);
        
        this.setValue('cmbDateMonth2', arrFecha[1]);
        
        this.setValue('txtPeriodo2', arrFecha[2]);
        
        this.setValue('txtGroup', this.p.bean.A2111GRUPO);
        this.setValue('txtAccountingDate', this.p.bean.A2111FCONT);
        this.setValue('chkClose', this.p.bean.A2111SPROC==='C'? true : false);
        
        this.setValue('txtUSCR', this.p.bean.A2111USRIN);
        this.setValue('txtFECR', this.p.bean.A2111FECIN);
        this.setValue('txtHOCR', this.p.bean.A2111HORIN);
        this.setValue('txtUSUP', this.p.bean.A2111USRAC);
        this.setValue('txtFEUP', this.p.bean.A2111FECAC);
        this.setValue('txtHOUP', this.p.bean.A2111HORAC);
        
        Ext.getCmp(prototype.id + '-lblA2111GRUPO_OLD').setText(this.p.bean.A2111GRUPO);
        
        Ext.getCmp(prototype.id + '-btn-update').setVisible(this.p.bloqueo === 'C' ? false : true);
        Ext.getCmp(prototype.id + '-btn-delete').setVisible(this.p.bloqueo === 'C' ? false : true);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanOption) {
        //Input para llenar el BEAN que se enviara al Store Procedure
   	beanOption.IN_A2111CCUST = '139';
	beanOption.IN_A2111FUENT = this.getValue("cbxSource2");
	beanOption.IN_A2111PSVTA = '';//(txtCountry.visible==false ? 'US' : app.trim(txtCountry.text));
	beanOption.IN_A2111SFUEN = '';//(txtChannel.visible==false ? cbxSource.selectedItem.data : app.trim(txtChannel.text));
	beanOption.IN_A2111MDA = this.getValue("txtCurrency");
	beanOption.IN_A2111MODO = 'E';

        var strPeriodo = this.getValue("txtPeriodo2").length === 2 ? "" : "0";
        strPeriodo += this.getValue("txtPeriodo2");
	var strClearance = this.getValue("cmbDateYear2") + this.getValue("cmbDateMonth2") + strPeriodo;

	beanOption.IN_A2111FPROC = strClearance;
	beanOption.IN_A2111GRUPO = this.getValue("txtGroup");
	beanOption.IN_A2111STPRO = '0';
	beanOption.IN_A2111FCONT = Ext.util.Format.date(this.getValue('txtAccountingDate'), 'Ymd');
	beanOption.IN_A2111SPROC = (this.getValue("chkClose") === true ? 'C' : 'O');
        beanOption.ESTIMADOS = new Array();
        //LLenar Cuentas
	for(var i = 0;i<this.p.lstConta.length;i++)
	{
            var beanCuenta = {};
            beanCuenta = this.p.lstConta[i];
            beanCuenta.A2112FUENT = this.getValue("cbxSource2");
            beanCuenta.A2112PAIS = (Ext.getCmp(prototype.id + '-txtCountry2').isVisible()===false ? 'US' : this.getValue("txtCountry2"));
            beanCuenta.A2112SUBFU = this.getValue("txtChannel2");
            beanCuenta.A2112CUR	= (Ext.getCmp(prototype.id + '-txtCurrency').isVisible()===false ? 'USD' : this.getValue("txtCurrency"));
            beanCuenta.A2112FPRO = strClearance;
            beanCuenta.A2112FCONT = Ext.util.Format.date(this.getValue('txtAccountingDate'), 'Ymd');
            
            if(beanCuenta.A2112ACTIV + beanCuenta.A2112PASIV >1)beanOption.ESTIMADOS.push(beanCuenta);
	}
        
        beanOption.IN_A2111GRUPO_OLD = this.getValue("txtGroup"); //app.trim(lblA2111GRUPO_OLD.text);
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
        this.setValue('txtA2112TITU', '');
        this.setValue('txtA2112CIA', '');
        this.setValue('txtA2112UNIDA', '');
        this.setValue('txtA2112CECOS', '');
        this.setValue('txtA2112UBICA', '');
        this.setValue('txtA2112CTA', '');
        this.setValue('txtA2112SCTA', '');
        this.setValue('txtA2112EQUI', '');
        this.setValue('txtA2112ICIA', '');
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
            obj.A2112TITRA= dato.A1740TITRA;
            obj.A2112TIPO = dato.A1740TIPO;
            obj.A2112SUBTI = dato.A1740SUBTI;
            obj.A2112CATEG = dato.A1740CATEG;
            obj.A2112CIAF = dato.A1740CIA;
            obj.A2112UNID = dato.A1740UNIDA;
            obj.A2112CECO = dato.A1740CECOS;
            obj.A2112UBICA = dato.A1740UBICA;
            obj.A2112CUENT = dato.A1740CTA;
            obj.A2112SUBCU = dato.A1740SCTA;
            obj.A2112EQUI = dato.A1740EQUI;
            obj.A2112ICIA = dato.A1740ICIA;
            obj.A2112TITU = dato.A1740CLIE;
            obj.A2112ACTIV = 0;
            obj.A2112PASIV = 0;
            obj.A2112CUENTA = dato.A1740CIA +' - '+ dato.A1740UNIDA +' - '+ dato.A1740CECOS + ' - '+ dato.A1740UBICA +' - '+
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
            Ext.getCmp(prototype.id + '-txtA2112UBICA').setReadOnly(true);
            Ext.getCmp(prototype.id + '-txtA2112CECOS').setReadOnly(true);
        } else {
            Ext.getCmp(prototype.id + '-txtA2112UBICA').setReadOnly(false);
            Ext.getCmp(prototype.id + '-txtA2112CECOS').setReadOnly(false);
        }
        this.setValue('txtA2112TITU', beanA1740.A1740CLIE);
        this.setValue('txtA2112CIA', beanA1740.A1740CIA);
        this.setValue('txtA2112UNIDA', beanA1740.A1740UNIDA);
        this.setValue('txtA2112CECOS', beanA1740.A1740CECOS);
        this.setValue('txtA2112UBICA', beanA1740.A1740UBICA);
        this.setValue('txtA2112CTA', beanA1740.A1740CTA);
        this.setValue('txtA2112SCTA', beanA1740.A1740SCTA);
        this.setValue('txtA2112EQUI', beanA1740.A1740EQUI);
        this.setValue('txtA2112ICIA', beanA1740.A1740ICIA);
        
        this.setValue('lblA1740TITRA', beanA1740.A1740TITRA);
        this.setValue('lblA1740TIPO', beanA1740.A1740TIPO);
        this.setValue('lblA1740SUBTI', beanA1740.A1740SUBTI);
        this.setValue('lblA1740CATEG', beanA1740.A1740CATEG);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    btnInsert_clickHandler: function () {
        if (this.validaRequiredFields()) {
            if (this.p.lstConta.length > 0) {
                var activo = 0;
                var pasivo = 0;
                var blanco = false;
                for (var i = 0; i < this.p.lstConta.length; i++) {
                    var dato = this.p.lstConta[i];
                    activo += Number(dato.A2112ACTIV);
                    pasivo += Number(dato.A2112PASIV);
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
    btnUpdate_clickHandler: function () {
        if (this.validaRequiredFields()) {
            if (this.p.lstConta.length > 0) {
                var activo = 0;
                var pasivo = 0;
                var blanco = false;
                for (var i = 0; i < this.p.lstConta.length; i++) {
                    var dato = this.p.lstConta[i];
                    activo += Number(dato.A2112ACTIV);
                    pasivo += Number(dato.A2112PASIV);
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
        if(this.getValue('txtA2112ACTIV').length === 0 || this.getValue('txtA2112PASIV').length === 0 ||
            this.getValue('txtA2112CIA')==='' || this.getValue('txtA2112UNIDA')==='' || this.getValue('txtA2112CECOS')==='' ||
            this.getValue('txtA2112UBICA')==='' || this.getValue('txtA2112CTA')==='' || this.getValue('txtA2112SCTA')==='' ||
            this.getValue('txtA2112EQUI')==='' || this.getValue('txtA2112ICIA')===''){
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
        objPre.A2112GRUPO = this.getValue("txtGroup");
        objPre.A2112PAIS = '';//app.trim(txtCountry.text);
        objPre.A2112FUENT = this.getValue("cbxSource2");
        objPre.A2112SUBFU = '';//app.trim(txtChannel.text);
        objPre.A2112CUR = this.getValue("txtCurrency");
        objPre.A2112FP = '';
        objPre.A2112MODO = 'E';
        var strPeriodo = this.getValue("txtPeriodo2").length === 2 ? "" : "0";
	strPeriodo += this.getValue("txtPeriodo2");
        objPre.A2112FPRO = this.getValue("cmbDateYear2") + this.getValue("cmbDateMonth2") + strPeriodo;
        objPre.A2112FCONT = Ext.util.Format.date(this.getValue('txtAccountingDate'), 'Ymd');
        objPre.A2112TITU = this.getValue("txtA2112TITU");
        objPre.A2112CIAF = this.getValue("txtA2112CIA");
        objPre.A2112UNID = this.getValue("txtA2112UNIDA");
        objPre.A2112CECO = this.getValue("txtA2112CECOS");
        objPre.A2112UBICA= this.getValue("txtA2112UBICA");
        objPre.A2112CUENT = this.getValue("txtA2112CTA");
        objPre.A2112SUBCU = this.getValue("txtA2112SCTA");
        objPre.A2112EQUI = this.getValue("txtA2112EQUI");
        objPre.A2112ICIA = this.getValue("txtA2112ICIA");
        objPre.A2112CUENTA =
            this.getValue("txtA2112CIA") +' - '+ this.getValue("txtA2112UNIDA") +' - '+
            this.getValue("txtA2112CECOS") +' - '+ this.getValue("txtA2112UBICA") +' - '+
            this.getValue("txtA2112CTA") +' - '+ this.getValue("txtA2112SCTA") +' - '+
            this.getValue("txtA2112EQUI") +' - '+ this.getValue("txtA2112ICIA");
        
        objPre.A2112ACTIV = Number(this.getValue("txtA2112ACTIV").replace(/,/g, ''));
        objPre.A2112PASIV = Number(this.getValue("txtA2112PASIV").replace(/,/g, ''));
        
        objPre.A2112TITRA = this.getValue("lblA1740TITRA");
        objPre.A2112TIPO = this.getValue("lblA1740TIPO");
        objPre.A2112SUBTI = this.getValue("lblA1740SUBTI");
        objPre.A2112CATEG = this.getValue("lblA1740CATEG");
        this.btnCancelAccount_clickHandler();
        if (btn.id.includes('btnAddAccount')) {
            if (this.validaRequiredFields()) {
                var duplicado = '';
                for (var i = 0; i < this.p.lstConta.length; i++) {
                    var dato = this.p.lstConta[i];
                    if((objPre.A2112TITRA + objPre.A2112TIPO + objPre.A2112SUBTI +objPre.A2112CATEG)==
                        (dato.A2112TITRA + dato.A2112TIPO + dato.A2112SUBTI +dato.A2112CATEG)) {
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
        if(data.A2112CIAF !=='' && (data.A2112UBICA==='' || data.A2112CECO==='')) {
            Ext.getCmp(prototype.id + '-txtA2112UBICA').setReadOnly(false);
            Ext.getCmp(prototype.id + '-txtA2112CECOS').setReadOnly(false);
        } else {
            Ext.getCmp(prototype.id + '-txtA2112UBICA').setReadOnly(true);
            Ext.getCmp(prototype.id + '-txtA2112CECOS').setReadOnly(true);
        }
        this.setValue('txtA2112ACTIV', Ext.util.Format.number(data.A2112ACTIV, '0,000.00'));
        this.setValue('txtA2112PASIV', Ext.util.Format.number(data.A2112PASIV, '0,000.00'));
        this.setValue('txtA2112CIA', data.A2112CIAF);
        this.setValue('txtA2112UNIDA', data.A2112UNID);
        this.setValue('txtA2112CECOS', data.A2112CECO);
        this.setValue('txtA2112UBICA', data.A2112UBICA);
        this.setValue('txtA2112CTA', data.A2112CUENT);
        this.setValue('txtA2112SCTA', data.A2112SUBCU);
        this.setValue('txtA2112EQUI', data.A2112EQUI);
        this.setValue('txtA2112ICIA', data.A2112ICIA);
        this.setValue('txtA2112TITU', data.A2112TITU);
        
        this.setValue('lblA1740TITRA', data.A2112TITRA);
        this.setValue('lblA1740TIPO', data.A2112TIPO);
        this.setValue('lblA1740SUBTI', data.A2112SUBTI);
        this.setValue('lblA1740CATEG', data.A2112CATEG);
        
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
        
        Ext.getCmp(prototype.id + '-txtA2112UBICA').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtA2112CECOS').setReadOnly(true);
        
        this.setValue('txtA2112TITU', '');
        this.setValue('txtA2112CIA', '');
        this.setValue('txtA2112UNIDA', '');
        this.setValue('txtA2112CECOS', '');
        this.setValue('txtA2112UBICA', '');
        this.setValue('txtA2112CTA', '');
        this.setValue('txtA2112SCTA', '');
        this.setValue('txtA2112EQUI', '');
        this.setValue('txtA2112ICIA', '');
        this.setValue('lblA1740TITRA', '');
        this.setValue('lblA1740TIPO', '');
        this.setValue('lblA1740SUBTI', '');
        this.setValue('lblA1740CATEG', '');
        this.setValue('txtA2112ACTIV', '0.00');
        this.setValue('txtA2112PASIV', '0.00');
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
            beforerequest: Ext.getCmp('DataEntryEstimationReverseARForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryEstimationReverseARForm').unmask();
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
                Ext.getCmp('DataEntryEstimationReverseARForm').unmask();
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