precision mediump float;
varying vec2 v_texcoord;
uniform sampler2D tex;

void main() {
    vec4 color = texture2D(tex, v_texcoord);
    
    // 1. RELAXED AMOLED BLACK (Pengurangan kepekatan hitam tahap akhir)
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    // Batas diturunkan ke 0.03 agar warna hitam tidak terlalu memotong detail visual
    if (gray < 0.03) {
        color.rgb *= (gray * 10.0); 
    }
    
    // 2. BALANCED CONTRAST
    vec3 factor = (color.rgb - 0.5) * 1.15 + 0.5;
    color.rgb = mix(color.rgb, factor, 0.50);
    
    // 3. LEDAKAN WARNA COLORFUL (Saturasi tetap dipertahankan agar tidak kusam)
    color.rgb = mix(vec3(gray), color.rgb, 1.45); 
    
    gl_FragColor = color;
}

