sed -i '104,113c\
      {user?.role === "PLATFORM_ADMIN" && (\
        <div className="p-4 border-t border-white/5">\
          <Link to="/admin" className="flex items-center gap-3 px-2 py-2 text-xs text-slate-500 hover:text-white transition-colors">\
            <div className="w-2 h-2 rounded-full bg-slate-700"></div>\
             Admin Console\
          </Link>\
        </div>\
      )}\
    </aside>\
  );\
}\
' src/components/layout/Sidebar.tsx
