    Ext.define('Ext.Praxis.controller.payments.SalesReconciliationTest.DataEntrySalesReconciliationTestController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntrySalesReconciliationTestController',
    bean: {},
    lstA2290: {},
    lstCards: {},
    actionCode: '',
    seq01: '',
    seq02: '',
    seq03: '',
    seq04: '',
    PERMISO: false,
    init: function(view) {
    },
    afterRender: function(){
        this.verificarPermisos(me.NPROG, 'M');
    },
    verificarPermisos: function(nprog, opcion) {
        var me1 = this;
        Ext.Ajax.request({
            url: prototype.urlMaster+'/validateUserProgramAccess',
            method: 'POST',
            timeout: 60000000,
            params: {nprog: nprog || ''},
            success: function(response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me1.PERMISO = win.validateAccess(res.matrix, opcion);
                    if (me1.PERMISO) win.getCmp('1-txtComment').show();
                    else win.getCmp('1-txtComment').hide();
                    if(me1.lstA2290 !== undefined){
                        for(var p = 0; p < me1.lstA2290.length; p++){
                            me1.bean = me1.lstA2290[p];
                            me1.mostrarData(me1.bean, String(p+1));
                        }
                    }
                } else global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    changeData: function (a, b, c, d, e, f, g, h) {
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
        console.log(e);
        console.log(f);
        console.log(g);
        console.log(h);
//        var fila = 0;
//        var tkt = "";
//	var obs = win.getValue('1-txtComment').trim();
//	var secuencia = "";
//	switch(fila){
//            case "1":
//                tkt = win.getValue('1-lblTicket01');
//                secuencia = this.seq01;
//                break;
//            case "2":
//                secuencia = this.seq02;
//                tkt = win.getValue('1-lblTicket03');
//                break;
//            case "3":
//                secuencia = this.seq03;
//                tkt = win.getValue('1-lblTicket05');
//                break;
//            case "4":
//                secuencia = this.seq04;
//                tkt = win.getValue('1-lblTicket07');
//                break;
//	}
//        
    },
    viewDataEntry: function (e, b, c) {
        var fila = '0';
        switch (e.target.id) {
            case prototype.id+'-1-imEdit01': case prototype.id+'-1-imEdit02': fila = '1'; break;
            case prototype.id+'-1-imEdit03': case prototype.id+'-1-imEdit04': fila = '2'; break;
            case prototype.id+'-1-imEdit05': case prototype.id+'-1-imEdit06': fila = '3'; break;
            case prototype.id+'-1-imEdit07': case prototype.id+'-1-imEdit08': fila = '4'; break;
        }
        if (this.lstA2290 !== undefined) {
            var beanCons = {};
            beanCons = this.lstA2290[Number(fila)-1];
            if(beanCons !== undefined && beanCons.strTicket !== ''){
                me.searchBean(beanCons, 'DataEntrySalesReconciliationTestForm');
            } else {
                global.Msg({msg: 'An error has ocurred. Please contact our System Department'});
            }
        }
    },
    //<editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function (beanTemp, fila) {
        var res = "";
        var error01 = false, error02 = false, error03 = false, error04 = false;//Error tipo 13 o 14
        
        switch(fila){
            case "1":
                this.seq01 = beanTemp.SEQ.trim();
                win.setValue('1-lblTicket01', beanTemp.strTicket.trim());
//                lblTicket01.toolTip = app.trim(beanTemp.strComment);
                if (beanTemp.TDOC === "R") {
                    win.setValue('1-lblType01', 'REFUND');
                } else {
                    win.setValue('1-lblType01', 'SALES');
                }
                win.setValue('1-lblStatus01', beanTemp.strDescStatus.trim());
                
                win.setValue('1-lblDateV01', beanTemp.SDATE.trim());
                win.setValue('1-lblCountry01', beanTemp.SCOUNTRY.trim());
//                lblCountry01.toolTip = app.trim(beanTemp.strDescCountry);
                win.setValue('1-lblCurren01', beanTemp.SCURRENCY.trim());
                win.setValue('1-lblAgent01', beanTemp.SAGENT.trim());
                win.setValue('1-lblError01', beanTemp.CERROR.trim());
//                lblError01.toolTip = app.trim(beanTemp.CERROR);
                if(beanTemp.CERROR.substr(0, 2) === "13" || beanTemp.CERROR.substr(0, 2) === "14"){
                    error01 = true;
                }
                win.setValue('1-txtAmount01', win.formatDblNumber(beanTemp.SVFOP));
                win.setValue('1-txtAuthor01', beanTemp.SAUTHOC.trim());
                win.setValue('1-txtCard01', beanTemp.strSCARDN.trim());
                win.setValue('1-lblCardC01', beanTemp.SCARCOD.trim());
//                lblCardC01.toolTip = app.trim(beanTemp.strDescCard);
                win.setValue('1-txtPNR01', beanTemp.SPNR.trim());

                if(this.PERMISO){
                    if(beanTemp.STVAL === "4"){
                        Ext.getCmp(prototype.id+'-1-imUpdate01').show();
                    } else if(beanTemp.STVAL === "2" && beanTemp.SVFOP < 0){
                        Ext.getCmp(prototype.id+'-1-imUpdate01').show();
                    } else{
                        Ext.getCmp(prototype.id+'-1-imUpdate01').hide();
                    }
                } else{
                    Ext.getCmp(prototype.id+'-1-imUpdate01').hide();
                }
                Ext.getCmp(prototype.id+'-1-imEdit01').show();
                //==========================================================
                win.setValue('1-lblTicket02', beanTemp.strTicket.trim());
//                lblTicket02.toolTip = app.trim(beanTemp.strComment);
                if (beanTemp.AFTE === "X") {
                    win.setValue('1-lblType02', 'Settlement BSP');
                } else if (beanTemp.AFTE === "A") {
                    win.setValue('1-lblType02', 'Settlement ARC');
                } else if (beanTemp.AFTE === "B") {
                    win.setValue('1-lblType02', 'Settlement ASR');
                } else if (beanTemp.AFTE === "N") {
                    win.setValue('1-lblType02', 'Settlement ASR');
                } else if (beanTemp.AFTE === "L") {
                    win.setValue('1-lblType02', 'Settlement ASR');
                } else {
                    win.setValue('1-lblType02', 'Settlement');
                }
                win.setValue('1-lblStatus02', beanTemp.strDescStatus.trim());
                win.setValue('1-lblDateV02', beanTemp.SDATE.trim());
                win.setValue('1-lblCountry02', beanTemp.ACOUNTRY.trim());
//                lblCountry02.toolTip = app.trim(beanTemp.strDescripcion);
                win.setValue('1-lblCurren02', beanTemp.ACURRENCY.trim());
                win.setValue('1-lblAgent02', beanTemp.AAGENT.trim());
                win.setValue('1-lblError02', beanTemp.CERROR.trim());
//                lblError02.toolTip = app.trim(beanTemp.CERROR);
                win.setValue('1-txtAmount02', win.formatDblNumber(beanTemp.AVFOP));
                win.setValue('1-txtAuthor02', beanTemp.AAUTHOC.trim());
                win.setValue('1-txtCard02', beanTemp.ACARDN.trim());
                win.setValue('1-lblCardC02', beanTemp.ACARCOD.trim());
//                lblCardC02.toolTip = app.trim(beanTemp.strADescCard);
                win.setValue('1-txtPNR02', beanTemp.APNR.trim());

                if(this.PERMISO){
                    if(beanTemp.STVAL === "4"){
                        Ext.getCmp(prototype.id+'-1-imUpdate02').show();
                    } else if(beanTemp.STVAL === "2" && beanTemp.SVFOP < 0){
                        Ext.getCmp(prototype.id+'-1-imUpdate02').show();
                    } else{
                        Ext.getCmp(prototype.id+'-1-imUpdate02').hide();
                    }
                } else{
                    Ext.getCmp(prototype.id+'-1-imUpdate02').hide();
                }
                Ext.getCmp(prototype.id+'-1-imEdit02').show();
                break;
            case "2":
                this.seq02 = beanTemp.SEQ.trim();
                win.setValue('1-lblTicket03', beanTemp.strTicket.trim());
//                lblTicket03.toolTip = beanTemp.strComment.trim();
                if (beanTemp.TDOC === "R") {
                    win.setValue('1-lblType03', 'REFUND');
                } else {
                    win.setValue('1-lblType03', 'SALES');
                }
                win.setValue('1-lblStatus03', beanTemp.strDescStatus.trim());
                win.setValue('1-lblDateV03', beanTemp.SDATE.trim());
                win.setValue('1-lblCountry03', beanTemp.SCOUNTRY.trim());
//                lblCountry03.toolTip = app.trim(beanTemp.strDescCountry);
                win.setValue('1-lblCurren03', beanTemp.SCURRENCY.trim());
                win.setValue('1-lblAgent03', beanTemp.SAGENT.trim());
                win.setValue('1-lblError03', beanTemp.CERROR.trim());
//                lblError03.toolTip = app.trim(beanTemp.CERROR);
                if(beanTemp.CERROR.substr(0, 2) === "13" || beanTemp.CERROR.substr(0, 2) === "14"){
                    error02 = true;
                }
                win.setValue('1-txtAmount03', win.formatDblNumber(beanTemp.SVFOP));
                win.setValue('1-txtAuthor03', beanTemp.SAUTHOC.trim());
                win.setValue('1-txtCard03', beanTemp.strSCARDN.trim());
                win.setValue('1-lblCardC03', beanTemp.SCARCOD.trim());
//                lblCardC03.toolTip = app.trim(beanTemp.strDescCard);
                win.setValue('1-txtPNR03', beanTemp.SPNR.trim());

                if(this.PERMISO){
                    if(beanTemp.STVAL === "4"){
                        Ext.getCmp(prototype.id+'-1-imUpdate03').show();
                    } else if(beanTemp.STVAL === "2" && beanTemp.SVFOP < 0){
                        Ext.getCmp(prototype.id+'-1-imUpdate03').show();
                    } else{
                        Ext.getCmp(prototype.id+'-1-imUpdate03').hide();
                    }
                } else{
                    Ext.getCmp(prototype.id+'-1-imUpdate03').hide();
                }
                Ext.getCmp(prototype.id+'-1-imEdit03').show();
                //==========================================================
                win.setValue('1-lblTicket04', beanTemp.strTicket.trim());
//                lblTicket04.toolTip = app.trim(beanTemp.strComment);
                if (beanTemp.AFTE === "X") {
                    win.setValue('1-lblType04', 'Settlement BSP');
                } else if (beanTemp.AFTE === "A") {
                    win.setValue('1-lblType04', 'Settlement ARC');
                } else if (beanTemp.AFTE === "B") {
                    win.setValue('1-lblType04', 'Settlement ASR');
                } else if (beanTemp.AFTE === "N") {
                    win.setValue('1-lblType04', 'Settlement ASR');
                } else if (beanTemp.AFTE === "L") {
                    win.setValue('1-lblType04', 'Settlement ASR');
                } else {
                    win.setValue('1-lblType04', 'Settlement');
                }
                win.setValue('1-lblStatus04', beanTemp.strDescStatus.trim());
                win.setValue('1-lblDateV04', beanTemp.SDATE.trim());
                win.setValue('1-lblCountry04', beanTemp.ACOUNTRY.trim());
//                lblCountry04.toolTip = app.trim(beanTemp.strDescripcion);
                win.setValue('1-lblCurren04', beanTemp.ACURRENCY.trim());
                win.setValue('1-lblAgent04', beanTemp.AAGENT.trim());
                win.setValue('1-lblError04', beanTemp.CERROR.trim());
//                lblError04.toolTip = app.trim(beanTemp.CERROR);
                win.setValue('1-txtAmount04', win.formatDblNumber(beanTemp.AVFOP));
                win.setValue('1-txtAuthor04', beanTemp.AAUTHOC.trim());
                win.setValue('1-txtCard04', beanTemp.ACARDN.trim());
                win.setValue('1-lblCardC04', beanTemp.ACARCOD.trim());
//                lblCardC04.toolTip = app.trim(beanTemp.strADescCard);
                win.setValue('1-txtPNR04', beanTemp.APNR.trim());

                if(this.PERMISO){
                    if(beanTemp.STVAL === "4"){
                        Ext.getCmp(prototype.id+'-1-imUpdate04').show();
                    } else if(beanTemp.STVAL === "2" && beanTemp.SVFOP < 0){
                        Ext.getCmp(prototype.id+'-1-imUpdate04').show();
                    } else{
                        Ext.getCmp(prototype.id+'-1-imUpdate04').hide();
                    }
                } else{
                    Ext.getCmp(prototype.id+'-1-imUpdate04').hide();
                }
                Ext.getCmp(prototype.id+'-1-imEdit04').show();
                break;
            case "3":
                this.seq03 = beanTemp.SEQ.trim();
                win.setValue('1-lblTicket05', beanTemp.strTicket.trim());
//                lblTicket05.toolTip = app.trim(beanTemp.strComment);
                if (beanTemp.TDOC === "R") {
                    win.setValue('1-lblType05', 'REFUND');
                } else {
                    win.setValue('1-lblType05', 'SALES');
                }
                win.setValue('1-lblStatus05', beanTemp.strDescStatus.trim());
                win.setValue('1-lblDateV05', beanTemp.SDATE.trim());
                win.setValue('1-lblCountry05', beanTemp.SCOUNTRY.trim());
//                lblCountry05.toolTip = app.trim(beanTemp.strDescCountry);
                win.setValue('1-lblCurren05', beanTemp.SCURRENCY.trim());
                win.setValue('1-lblAgent05', beanTemp.SAGENT.trim());
                win.setValue('1-lblError05', beanTemp.CERROR.trim());
//                lblError05.toolTip = app.trim(beanTemp.CERROR);
                if(beanTemp.CERROR.substr(0, 2) === "13" || beanTemp.CERROR.substr(0, 2) === "14"){
                    error03 = true;
                }
                win.setValue('1-txtAmount05', win.formatDblNumber(beanTemp.SVFOP));
                win.setValue('1-txtAuthor05', beanTemp.SAUTHOC.trim());
                win.setValue('1-txtCard05', beanTemp.strSCARDN.trim());
                win.setValue('1-lblCardC05', beanTemp.SCARCOD.trim());
//                lblCardC05.toolTip = app.trim(beanTemp.strDescCard);
                win.setValue('1-txtPNR05', beanTemp.SPNR.trim());

                if(this.PERMISO){
                    if(beanTemp.STVAL === "4"){
                        Ext.getCmp(prototype.id+'-1-imUpdate05').show();
                    } else if(beanTemp.STVAL === "2" && beanTemp.SVFOP < 0){
                        Ext.getCmp(prototype.id+'-1-imUpdate05').show();
                    } else{
                        Ext.getCmp(prototype.id+'-1-imUpdate05').hide();
                    }
                } else{
                    Ext.getCmp(prototype.id+'-1-imUpdate05').hide();
                }
                Ext.getCmp(prototype.id+'-1-imEdit05').show();
                //==========================================================
                win.setValue('1-lblTicket06', beanTemp.strTicket.trim());
//                lblTicket06.toolTip = app.trim(beanTemp.strComment);
                if (beanTemp.AFTE === "X") {
                    win.setValue('1-lblType06', 'Settlement BSP');
                } else if (beanTemp.AFTE === "A") {
                    win.setValue('1-lblType06', 'Settlement ARC');
                } else if (beanTemp.AFTE === "B") {
                    win.setValue('1-lblType06', 'Settlement ASR');
                } else if (beanTemp.AFTE === "N") {
                    win.setValue('1-lblType06', 'Settlement ASR');
                } else if (beanTemp.AFTE === "L") {
                    win.setValue('1-lblType06', 'Settlement ASR');
                } else {
                    win.setValue('1-lblType06', 'Settlement');
                }
                win.setValue('1-lblStatus06', beanTemp.strDescStatus.trim());
                win.setValue('1-lblDateV06', beanTemp.SDATE.trim());
                win.setValue('1-lblCountry06', beanTemp.ACOUNTRY.trim());
//                lblCountry06.toolTip = app.trim(beanTemp.strDescripcion);
                win.setValue('1-lblCurren06', beanTemp.ACURRENCY.trim());
                win.setValue('1-lblAgent06', beanTemp.AAGENT.trim());
                win.setValue('1-lblError06', beanTemp.CERROR.trim());
//                lblError06.toolTip = app.trim(beanTemp.CERROR);
                win.setValue('1-txtAmount06', win.formatDblNumber(beanTemp.AVFOP));
                win.setValue('1-txtAuthor06', beanTemp.AAUTHOC.trim());
                win.setValue('1-txtCard06', beanTemp.ACARDN.trim());
                win.setValue('1-lblCardC06', beanTemp.ACARCOD.trim());
//                lblCardC06.toolTip = app.trim(beanTemp.strADescCard);
                win.setValue('1-txtPNR06', beanTemp.APNR.trim());

                if(this.PERMISO){
                    if(beanTemp.STVAL === "4"){
                        Ext.getCmp(prototype.id+'-1-imUpdate06').show();
                    } else if(beanTemp.STVAL === "2" && beanTemp.SVFOP < 0){
                        Ext.getCmp(prototype.id+'-1-imUpdate06').show();
                    } else{
                        Ext.getCmp(prototype.id+'-1-imUpdate06').hide();
                    }
                } else{
                    Ext.getCmp(prototype.id+'-1-imUpdate06').hide();
                }
                Ext.getCmp(prototype.id+'-1-imEdit06').show();
                break;
            case "4":
                this.seq04 = beanTemp.SEQ.trim();
                win.setValue('1-lblTicket07', beanTemp.strTicket.trim());
//                lblTicket07.toolTip = app.trim(beanTemp.strComment);
                if (beanTemp.TDOC === "R") {
                    win.setValue('1-lblType07', 'REFUND');
                } else {
                    win.setValue('1-lblType07', 'SALES');
                }
                win.setValue('1-lblStatus07', beanTemp.strDescStatus.trim());
                win.setValue('1-lblDateV07', beanTemp.SDATE.trim());
                win.setValue('1-lblCountry07', beanTemp.SCOUNTRY.trim());
//                lblCountry07.toolTip = app.trim(beanTemp.strDescCountry);
                win.setValue('1-lblCurren07', beanTemp.SCURRENCY.trim());
                win.setValue('1-lblAgent07', beanTemp.SAGENT.trim());
                win.setValue('1-lblError07', beanTemp.CERROR.trim());
//                lblError07.toolTip = app.trim(beanTemp.CERROR);
                if(beanTemp.CERROR.substr(0, 2) === "13" || beanTemp.CERROR.substr(0, 2) === "14"){
                    error04 = true;
                }
                win.setValue('1-txtAmount07', win.formatDblNumber(beanTemp.SVFOP));
                win.setValue('1-txtAuthor07', beanTemp.SAUTHOC.trim());
                win.setValue('1-txtCard07', beanTemp.strSCARDN.trim());
                win.setValue('1-lblCardC07', beanTemp.SCARCOD.trim());
//                lblCardC07.toolTip = app.trim(beanTemp.strDescCard);
                win.setValue('1-txtPNR07', beanTemp.SPNR.trim());

                if(this.PERMISO){
                    if(beanTemp.STVAL === "4"){
                        Ext.getCmp(prototype.id+'-1-imUpdate07').show();
                    } else if(beanTemp.STVAL == "2" && beanTemp.SVFOP < 0){
                        Ext.getCmp(prototype.id+'-1-imUpdate07').show();
                    } else{
                        Ext.getCmp(prototype.id+'-1-imUpdate07').hide();
                    }
                } else{
                    Ext.getCmp(prototype.id+'-1-imUpdate07').hide();
                }
                Ext.getCmp(prototype.id+'-1-imEdit07').show();
                //==========================================================
                win.setValue('1-lblTicket08', beanTemp.strTicket.trim());
//                lblTicket08.toolTip = app.trim(beanTemp.strComment);
                if (beanTemp.AFTE === "X") {
                    win.setValue('1-lblType08', 'Settlement BSP');
                } else if (beanTemp.AFTE === "A") {
                    win.setValue('1-lblType08', 'Settlement ARC');
                } else if (beanTemp.AFTE === "B") {
                    win.setValue('1-lblType08', 'Settlement ASR');
                } else if (beanTemp.AFTE === "N") {
                    win.setValue('1-lblType08', 'Settlement ASR');
                } else if (beanTemp.AFTE == "L") {
                    win.setValue('1-lblType08', 'Settlement ASR');
                } else {
                    win.setValue('1-lblType08', 'Settlement');
                }
                win.setValue('1-lblStatus08', beanTemp.strDescStatus.trim());
                win.setValue('1-lblDateV08', beanTemp.SDATE.trim());
                win.setValue('1-lblCountry08', beanTemp.ACOUNTRY.trim());
//                lblCountry08.toolTip = app.trim(beanTemp.strDescripcion);
                win.setValue('1-lblCurren08', beanTemp.ACURRENCY.trim());
                win.setValue('1-lblAgent08', beanTemp.AAGENT.trim());
                win.setValue('1-lblError08', beanTemp.CERROR.trim());
//                lblError08.toolTip = app.trim(beanTemp.CERROR);
                win.setValue('1-txtAmount08', win.formatDblNumber(beanTemp.AVFOP));
                win.setValue('1-txtAuthor08', beanTemp.AAUTHOC.trim());
                win.setValue('1-txtCard08', beanTemp.ACARDN.trim());
                win.setValue('1-lblCardC08', beanTemp.ACARCOD.trim());
//                lblCardC08.toolTip = app.trim(beanTemp.strADescCard);
                win.setValue('1-txtPNR08', beanTemp.APNR.trim());

                if(this.PERMISO){
                    if(beanTemp.STVAL === "4"){
                        Ext.getCmp(prototype.id+'-1-imUpdate08').show();
                    } else if(beanTemp.STVAL === "2" && beanTemp.SVFOP < 0){
                        Ext.getCmp(prototype.id+'-1-imUpdate08').show();
                    } else{
                        Ext.getCmp(prototype.id+'-1-imUpdate08').hide();
                    }
                } else{
                    Ext.getCmp(prototype.id+'-1-imUpdate08').hide();
                }
                Ext.getCmp(prototype.id+'-1-imEdit08').show();
                break;
	}
	
//	if(error01 || error02 || error03 || error04){
//		//txtAmount01	
//		if(error01){
//			txtAmount01.styleName = "CSS0001TextError";
//			txtAmount02.styleName = "CSS0001TextError";
//		}else{
//			txtAmount01.styleName = "CSS0001TextInput";
//			txtAmount02.styleName = "CSS0001TextInput";
//		}
//		if(error02){
//			txtAmount03.styleName = "CSS0001TextError";
//			txtAmount04.styleName = "CSS0001TextError";
//		}else{
//			txtAmount03.styleName = "CSS0001TextInput";
//			txtAmount04.styleName = "CSS0001TextInput";
//		}
//		if(error03){
//			txtAmount05.styleName = "CSS0001TextError";
//			txtAmount06.styleName = "CSS0001TextError";
//		}else{
//			txtAmount05.styleName = "CSS0001TextInput";
//			txtAmount06.styleName = "CSS0001TextInput";
//		}
//		if(error04){
//			txtAmount07.styleName = "CSS0001TextError";
//			txtAmount08.styleName = "CSS0001TextError";
//		}else{
//			txtAmount07.styleName = "CSS0001TextInput";
//			txtAmount08.styleName = "CSS0001TextInput";
//		}
//		
//	}else{
//	
//		//lblCountry01
//		if(lblCountry01.text != lblCountry02.text){
//			lblCountry01.styleName = "CSS0001TextError";
//			lblCountry02.styleName = "CSS0001TextError";
//		}else{
//			lblCountry01.styleName = "CSS0001TextInput";
//			lblCountry02.styleName = "CSS0001TextInput";
//		}
//		if(lblCountry03.text != lblCountry04.text){
//			lblCountry03.styleName = "CSS0001TextError";
//			lblCountry04.styleName = "CSS0001TextError";
//		}else{
//			lblCountry03.styleName = "CSS0001TextInput";
//			lblCountry04.styleName = "CSS0001TextInput";
//		}
//		if(lblCountry05.text != lblCountry06.text){
//			lblCountry05.styleName = "CSS0001TextError";
//			lblCountry06.styleName = "CSS0001TextError";
//		}else{
//			lblCountry05.styleName = "CSS0001TextInput";
//			lblCountry06.styleName = "CSS0001TextInput";
//		}
//		if(lblCountry07.text != lblCountry08.text){
//			lblCountry07.styleName = "CSS0001TextError";
//			lblCountry08.styleName = "CSS0001TextError";
//		}else{
//			lblCountry07.styleName = "CSS0001TextInput";
//			lblCountry08.styleName = "CSS0001TextInput";
//		}
//		
//		//lblCurren01
//		if(lblCurren01.text != lblCurren02.text){
//			lblCurren01.styleName = "CSS0001TextError";
//			lblCurren02.styleName = "CSS0001TextError";
//		}else{
//			lblCurren01.styleName = "CSS0001TextInput";
//			lblCurren02.styleName = "CSS0001TextInput";
//		}
//		if(lblCurren03.text != lblCurren04.text){
//			lblCurren03.styleName = "CSS0001TextError";
//			lblCurren04.styleName = "CSS0001TextError";
//		}else{
//			lblCurren03.styleName = "CSS0001TextInput";
//			lblCurren04.styleName = "CSS0001TextInput";
//		}
//		if(lblCurren05.text != lblCurren06.text){
//			lblCurren05.styleName = "CSS0001TextError";
//			lblCurren06.styleName = "CSS0001TextError";
//		}else{
//			lblCurren05.styleName = "CSS0001TextInput";
//			lblCurren06.styleName = "CSS0001TextInput";
//		}
//		if(lblCurren07.text != lblCurren08.text){
//			lblCurren07.styleName = "CSS0001TextError";
//			lblCurren08.styleName = "CSS0001TextError";
//		}else{
//			lblCurren07.styleName = "CSS0001TextInput";
//			lblCurren08.styleName = "CSS0001TextInput";
//		}
//		
//		//lblCardC01
//		if(lblCardC01.text != lblCardC02.text){
//			lblCardC01.styleName = "CSS0001TextError";
//			lblCardC02.styleName = "CSS0001TextError";
//		}else{
//			lblCardC01.styleName = "CSS0001TextInput";
//			lblCardC02.styleName = "CSS0001TextInput";
//		}
//		if(lblCardC03.text != lblCardC04.text){
//			lblCardC03.styleName = "CSS0001TextError";
//			lblCardC04.styleName = "CSS0001TextError";
//		}else{
//			lblCardC03.styleName = "CSS0001TextInput";
//			lblCardC04.styleName = "CSS0001TextInput";
//		}
//		if(lblCardC05.text != lblCardC06.text){
//			lblCardC05.styleName = "CSS0001TextError";
//			lblCardC06.styleName = "CSS0001TextError";
//		}else{
//			lblCardC05.styleName = "CSS0001TextInput";
//			lblCardC06.styleName = "CSS0001TextInput";
//		}
//		if(lblCardC07.text != lblCardC08.text){
//			lblCardC07.styleName = "CSS0001TextError";
//			lblCardC08.styleName = "CSS0001TextError";
//		}else{
//			lblCardC07.styleName = "CSS0001TextInput";
//			lblCardC08.styleName = "CSS0001TextInput";
//		}
//		
//		//lblAgent01
//		if(lblAgent01.text != lblAgent02.text){
//			lblAgent01.styleName = "CSS0001TextError";
//			lblAgent02.styleName = "CSS0001TextError";
//		}else{
//			lblAgent01.styleName = "CSS0001TextInput";
//			lblAgent02.styleName = "CSS0001TextInput";
//		}
//		if(lblAgent03.text != lblAgent04.text){
//			lblAgent03.styleName = "CSS0001TextError";
//			lblAgent04.styleName = "CSS0001TextError";
//		}else{
//			lblAgent03.styleName = "CSS0001TextInput";
//			lblAgent04.styleName = "CSS0001TextInput";
//		}
//		if(lblAgent05.text != lblAgent06.text){
//			lblAgent05.styleName = "CSS0001TextError";
//			lblAgent06.styleName = "CSS0001TextError";
//		}else{
//			lblAgent05.styleName = "CSS0001TextInput";
//			lblAgent06.styleName = "CSS0001TextInput";
//		}
//		if(lblAgent07.text != lblAgent08.text){
//			lblAgent07.styleName = "CSS0001TextError";
//			lblAgent08.styleName = "CSS0001TextError";
//		}else{
//			lblAgent07.styleName = "CSS0001TextInput";
//			lblAgent08.styleName = "CSS0001TextInput";
//		}
//		
//		//txtAmount01	
//		if(txtAmount01.text != txtAmount02.text){
//			txtAmount01.styleName = "CSS0001TextError";
//			txtAmount02.styleName = "CSS0001TextError";
//		}else{
//			txtAmount01.styleName = "CSS0001TextInput";
//			txtAmount02.styleName = "CSS0001TextInput";
//		}
//		if(txtAmount03.text != txtAmount04.text){
//			txtAmount03.styleName = "CSS0001TextError";
//			txtAmount04.styleName = "CSS0001TextError";
//		}else{
//			txtAmount03.styleName = "CSS0001TextInput";
//			txtAmount04.styleName = "CSS0001TextInput";
//		}
//		if(txtAmount05.text != txtAmount06.text){
//			txtAmount05.styleName = "CSS0001TextError";
//			txtAmount06.styleName = "CSS0001TextError";
//		}else{
//			txtAmount05.styleName = "CSS0001TextInput";
//			txtAmount06.styleName = "CSS0001TextInput";
//		}
//		if(txtAmount07.text != txtAmount08.text){
//			txtAmount07.styleName = "CSS0001TextError";
//			txtAmount08.styleName = "CSS0001TextError";
//		}else{
//			txtAmount07.styleName = "CSS0001TextInput";
//			txtAmount08.styleName = "CSS0001TextInput";
//		}
//		//txtAuthor	
//		if(txtAuthor01.text != txtAuthor02.text){
//			txtAuthor01.styleName = "CSS0001TextError";
//			txtAuthor02.styleName = "CSS0001TextError";
//		}else{
//			txtAuthor01.styleName = "CSS0001TextInput";
//			txtAuthor02.styleName = "CSS0001TextInput";
//		}
//		if(txtAuthor03.text != txtAuthor04.text){
//			txtAuthor03.styleName = "CSS0001TextError";
//			txtAuthor04.styleName = "CSS0001TextError";
//		}else{
//			txtAuthor03.styleName = "CSS0001TextInput";
//			txtAuthor04.styleName = "CSS0001TextInput";
//		}
//		if(txtAuthor05.text != txtAuthor06.text){
//			txtAuthor05.styleName = "CSS0001TextError";
//			txtAuthor06.styleName = "CSS0001TextError";
//		}else{
//			txtAuthor05.styleName = "CSS0001TextInput";
//			txtAuthor06.styleName = "CSS0001TextInput";
//		}
//		if(txtAuthor07.text != txtAuthor08.text){
//			txtAuthor07.styleName = "CSS0001TextError";
//			txtAuthor08.styleName = "CSS0001TextError";
//		}else{
//			txtAuthor07.styleName = "CSS0001TextInput";
//			txtAuthor08.styleName = "CSS0001TextInput";
//		}
//		//txtCard
//		if(app.trim(txtCard01.text) != "" || app.trim(txtCard02.text) != ""){
//			res = obtenerTarjeta(app.trim(txtCard01.text), app.trim(txtCard02.text));
//			if(res == "1"){
//				txtCard01.styleName = "CSS0001TextInput";
//				txtCard02.styleName = "CSS0001TextInput";
//			}else{
//				txtCard01.styleName = "CSS0001TextError";
//				txtCard02.styleName = "CSS0001TextError";
//			}
//		}
//		
//		if(app.trim(txtCard03.text) != "" || app.trim(txtCard04.text) != ""){
//			
//			res = obtenerTarjeta(app.trim(txtCard03.text), app.trim(txtCard04.text));
//			if(res == "1"){
//				txtCard03.styleName = "CSS0001TextInput";
//				txtCard04.styleName = "CSS0001TextInput";
//			}else{
//				txtCard03.styleName = "CSS0001TextError";
//				txtCard04.styleName = "CSS0001TextError";
//			}
//		}
//		if(app.trim(txtCard05.text) != "" || app.trim(txtCard06.text) != ""){
//			
//			res = obtenerTarjeta(app.trim(txtCard05.text), app.trim(txtCard06.text));
//			if(res == "1"){
//				txtCard05.styleName = "CSS0001TextInput";
//				txtCard06.styleName = "CSS0001TextInput";
//			}else{
//				txtCard05.styleName = "CSS0001TextError";
//				txtCard06.styleName = "CSS0001TextError";
//			}
//		}
//		if(app.trim(txtCard07.text) != "" || app.trim(txtCard08.text) != ""){
//			
//			res = obtenerTarjeta(app.trim(txtCard07.text), app.trim(txtCard08.text));
//			if(res == "1"){
//				txtCard07.styleName = "CSS0001TextInput";
//				txtCard08.styleName = "CSS0001TextInput";
//			}else{
//				txtCard07.styleName = "CSS0001TextError";
//				txtCard08.styleName = "CSS0001TextError";
//			}
//		}
//		//txtPNR
//		if(txtPNR01.text != txtPNR02.text){
//			txtPNR01.styleName = "CSS0001TextError";
//			txtPNR02.styleName = "CSS0001TextError";
//		}else{
//			txtPNR01.styleName = "CSS0001TextInput";
//			txtPNR02.styleName = "CSS0001TextInput";
//		}
//		if(txtPNR03.text != txtPNR04.text){
//			txtPNR03.styleName = "CSS0001TextError";
//			txtPNR04.styleName = "CSS0001TextError";
//		}else{
//			txtPNR03.styleName = "CSS0001TextInput";
//			txtPNR04.styleName = "CSS0001TextInput";
//		}
//		if(txtPNR05.text != txtPNR06.text){
//			txtPNR05.styleName = "CSS0001TextError";
//			txtPNR06.styleName = "CSS0001TextError";
//		}else{
//			txtPNR05.styleName = "CSS0001TextInput";
//			txtPNR06.styleName = "CSS0001TextInput";
//		}
//		if(txtPNR07.text != txtPNR08.text){
//			txtPNR07.styleName = "CSS0001TextError";
//			txtPNR08.styleName = "CSS0001TextError";
//		}else{
//			txtPNR07.styleName = "CSS0001TextInput";
//			txtPNR08.styleName = "CSS0001TextInput";
//		}
//		
//	}
    },
    //</editor-fold>
});