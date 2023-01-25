/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.classes;

/**
 *
 * @author lmendoza
 */
import com.sun.jna.Native;
import com.sun.jna.platform.win32.WinNT;
import com.sun.jna.win32.StdCallLibrary;

public class Win32Process {

    public static interface Psapi extends StdCallLibrary {

        Psapi INSTANCE = (Psapi) Native.loadLibrary("Psapi", Psapi.class);

        boolean EnumProcesses(int[] ProcessIDsOut, int size, int[] BytesReturned);

        int GetModuleFileNameExA(WinNT.HANDLE process, WinNT.HANDLE module, byte[] name, int i);
    }

    public interface Kernel32 extends StdCallLibrary {

        Kernel32 INSTANCE = (Kernel32) Native.loadLibrary("kernel32", Kernel32.class);

        WinNT.HANDLE OpenProcess(int dwDesiredAccess, boolean bInheritHandle, int dwProcessId);
    }

    public Win32Process() {

    }

    public WinNT.HANDLE GetProcessHandle(int pid) {
        WinNT.HANDLE handle = null;

        try {
            handle = Kernel32.INSTANCE.OpenProcess(0x0400 | 0x0010, false, pid);
        } catch (Exception ex) {

        }

        return handle;
    }
}
