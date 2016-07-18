        ;delay for a number of ms (specified by acc)
delay:
        mov     r0, a
dly2:   mov     r1, #230
dly3:   nop
        nop
        nop                     ;6 NOPs + DJNZ is 4.34 us
        nop                     ;with the 22.1184 MHz crystal
        nop
        nop
        djnz    r1, dly3        ;repeat 230 times for 1 ms
        djnz    r0, dly2        ;repeat for specified # of ms
        ret
END