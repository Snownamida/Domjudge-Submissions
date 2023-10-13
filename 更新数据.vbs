Dim WinScriptHost
Set WinScriptHost = CreateObject("WScript.Shell")
WinScriptHost.Run Chr(34) & "G:\WORK\学习\法国\1. INSA\8. IF3\0. Divers\Domjudge\更新数据.bat" & Chr(34), 0
Set WinScriptHost = Nothing